import process from 'node:process'
import { Server } from 'socket.io'
import {
  addPlayerToRoom,
  createGameRoom,
  makeMove,
  removePlayerFromRoom,
} from './game.controller.js'

export function createWSServer(server) {
  const io = new Server(server, {
    cors: { origin: process.env.CORS_ALLOWED_HOST },
    path: '/game',
  })

  io.on('connection', (socket) => {
    console.log(`⚡: Socket ${socket.id} started!`)

    socket
      .on('create_game', (payload, cb) => {
        const { rounds, maxPlayers } = payload
        // TODO: Validate payload

        try {
          const room = createGameRoom({ rounds, maxPlayers })

          cb([null, { room }])
        } catch (error) {
          // TODO: Make sure you're not sending sensitive data in here
          cb([error])
        }
      })
      .on('join_game', (payload, cb) => {
        try {
          const { nickname, roomId } = payload
          const { player, room } = addPlayerToRoom({ nickname }, roomId)

          socket.broadcast.emit('player_joined', [null, { room }])
          cb([null, { room, player }])
        } catch (error) {
          // TODO: Make sure you're not sending sensitive data in here
          cb([error])
        }
      })
      .on('exit_game', (payload, cb) => {
        try {
          const { playerId, roomId } = payload
          removePlayerFromRoom(playerId, roomId)

          socket.broadcast.emit('player_left', [
            null,
            { playerId },
          ])
          cb([null, { result: 'success' }])
        } catch (error) {
          // TODO: Make sure you're not sending sensitive data in here
          cb([error])
        }
      })
      .on('move', (payload, cb) => {
        try {
          const { roomId, playerId, move } = payload
          makeMove({ roomId, playerId, move })

          cb([null, { result: 'success' }])
        } catch (error) {
          // TODO: Make sure you're not sending sensitive data in here
          cb([error])
        }
      })

    socket.on('disconnect', (reason) => {
      console.log(`🔥: Socket ${socket.id} disconnected because: ${reason}`)
    })
  })
}
