import { GAME } from '../constants/game.constant'

export type MoveOptions = typeof GAME.ALLOWED_MOVES[number]
export type GameStatus = typeof GAME.STATUSES[number]
export type Room = {
  roomId: string
  maxPlayers: number
  rounds: number
  status: GameStatus
  gameplay?: Gameplay
  players: Array<Player>
}
export type Player = {
  playerId: string
  nickname: string
}
export type Gameplay = {
  [key: string]: Array<MoveOptions>
  // [key: string]: Array<typeof GAME.ALLOWED_MOVES[number]>
}
