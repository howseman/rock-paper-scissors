import * as dotenv from 'dotenv'
import express from 'express'
import process from 'node:process'
import cors from 'cors'
import http from 'http'
import { createWSServer } from './infrastructure/wsServer.js'
import * as GameController from './infrastructure/game.controller.js'

dotenv.config()

const PORT = Number.parseInt(process.env.PORT, 10)
const app = express()

app.use(cors({ origin: process.env.CORS_ALLOWED_HOST }))

app.get('/status', (req, res) => {
  const rooms = GameController.getActiveRooms()
  return res.json({
    data: {
      appName: 'Rock, Paper & Scissors Game',
      appVersion: process.env.npm_package_version,
      rooms,
    },
  })
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(
    `RPS Game :: API Server running on ${process.env.HOST_NAME}:${PORT}`
  )
})

createWSServer(server)
