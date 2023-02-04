import { Room, Player } from '../types/Room'
import { State, Action } from './State'
import { GAME } from '../constants/game.constant'

export const ACTION = {
  JOINED_THE_GAME: 'JOINED_THE_GAME', // Current user joined the game
  NEW_PLAYER_JOINED: 'NEW_PLAYER_JOINED', // Another player joined the game
  RESET_GAME: 'RESET_GAME',
  LEFT_GAME: 'LEFT_GAME', // Current user left the game
  PLAYER_LEFT: 'PLAYER_LEFT', // Another player left the game
  ERROR_THROWN: 'ERROR_THROWN',
} as const
export const actionKeys = Object.keys(ACTION)

export const gameInitialState: State = {
  room: {
    maxPlayers: GAME.MAX_ALLOWED_PLAYERS,
    roomId: '',
    rounds: GAME.MIN_ALLOWED_ROUNDS,
    status: 'non-started',
    players: [],
  },
  currentPlayer: {},
}

export function gameReducer(state: State = gameInitialState, action: Action) {
  switch (action.type) {
    case ACTION.JOINED_THE_GAME: {
      console.log('En el reducer con', action.payload)
      const { room, player } = action.payload as { room: Room; player: Player }
      return { ...state, room, currentPlayer: player }
    }
    case ACTION.NEW_PLAYER_JOINED: {
      console.log('NEW_PLAYER_JOINED', action.payload)
      const room = action.payload as Room
      return { ...state, room }
    }
    case ACTION.LEFT_GAME: {
      return gameInitialState
    }
    case ACTION.PLAYER_LEFT: {
      const { playerId } = action.payload
      const currentPlayers = state.room.players.filter(
        (player) => player.playerId !== playerId
      )
      const currentGameplay = { ...state.room.gameplay }
      delete currentGameplay[playerId]

      const newState = {
        ...state,
        room: {
          ...state.room,
          gameplay: currentGameplay,
          players: currentPlayers,
        },
      }

      return newState
    }
    default:
      return state
  }
}
