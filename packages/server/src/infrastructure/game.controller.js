import GameRoom from '../domain/Game.js'
import Player from '../domain/Player.js'
import { dataService } from '../application/roomData.service.js'

export function createGameRoom({ rounds, maxPlayers }) {
  const room = new GameRoom({ rounds, maxPlayers })
  dataService.saveRoom(room)

  return room
}

export function getRoom(roomId) {
  const room = dataService.getRoom(roomId)
  return room ?? null
}

export function addPlayerToRoom({ nickname }, roomId) {
  // TODO: Verify that the room exists before anything
  // TODO: Validate if the nickname is already in the room
  // TODO: Validate if the game already started, if yes, the new player can't join
  const room = dataService.getRoom(roomId)

  // TODO: Verify if the number of players already in the room is <
  // to the max number of players allowed

  const player = new Player(nickname)
  room.addPlayer(player)
  dataService.saveRoom(room)

  return { player, room }
}

export function removePlayerFromRoom(playerId, roomId) {
  const room = dataService.getRoom(roomId)

  if (!room) {
    // TODO: Send this action to logs
    return true
  }

  // TODO: Validate if the playerId is in the room
  room.removePlayer(playerId)

  // If no more players in the room, delete the room
  if (room.players.length === 0) {
    dataService.removeRoom(roomId)
  } else {
    dataService.saveRoom(room)
  }

  return true
}

export function makeMove({ roomId, playerId, move }) {
  const room = dataService.getRoom(roomId)
  room.makeMove({ playerId, move })
  //TODO: If all players moved, emit the new gameState
  return true
}

export function dropGame() {
  // TODO: Clean the DB when a game is terminated
  return true
}

export function getActiveRooms() {
  const rooms = dataService.getAll()
  return rooms
}
