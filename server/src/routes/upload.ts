import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { FastifyInstance } from 'fastify'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

// pipeline aguarda o processo de upload acabar
// stram de pouco em pouco
// promisfy é quase uma promisse
const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, // 5 mb
      },
    })

    if (!upload) {
      // se o usuer chamou essa rota mas não enviou nada, toma errinho
      return reply.status(400).send()
    }

    // regex apenas para vídeo e imagem
    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isAValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    // se o mimetype nao é imagem ou vídeo
    if (!isAValidFileFormat) {
      return reply.status(400).send()
    }
    // http POST localhost:3333/upload file@~/Downloads/tattoo.png -f
    // console.log(upload.filename)

    const fileId = randomUUID() // gerar id unico para cada imagem upada
    const extension = extname(upload.filename) // extensão do arquivo orignal
    const fileName = fileId.concat(extension) // nome vai ser o novo id

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', fileName), // padronizar o caminho
    )

    await pump(upload.file, writeStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname) // Backend
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString() // /uploads com o nome do arquivo

    return {
      ok: true,
    }
  })
}
