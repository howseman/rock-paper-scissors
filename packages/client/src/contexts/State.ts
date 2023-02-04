import { Room, Player } from '../types/Room'
import { actionKeys } from './gameReducer'

type ActionType = typeof actionKeys[number]
export type Action = {
  type: ActionType
  payload?: unknown
}
export type Dispatch = (action: Action) => void
export type ActionCreator = <T>(dispatch: Dispatch, payload: T) => void

export type State = {
  room: Room
  currentPlayer: Player | object
}
