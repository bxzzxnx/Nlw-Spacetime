import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

console.log('console test')

const app = fastify()

app.register(cors, {
  origin: ['http://localhost:3333'], // true
})
app.register(memoriesRoutes)

// d5120918-3a45-4326-ae74-8215a606640a
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('runing on port 3333')
  })
