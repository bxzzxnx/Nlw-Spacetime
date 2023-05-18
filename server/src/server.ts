import 'dotenv/config'
import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

console.log('console test')

const app = fastify()

app.register(cors, {
  origin: true, // true ['http://localhost:3333']
})
app.register(jwt, {
  secret: 'spacetime', // maneira de diferenciar tokens/ criptografia
})

app.register(memoriesRoutes)
app.register(authRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('runing on port 3333')
  })
