import { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../contexts/game.context'
import { ACTION } from '../contexts/gameReducer'
import { Dispatch } from '../contexts/State'
import gameServiceCreator from '../services/game.service'
import { Player, Room } from '../types/Room'

export type IncomingEventActions = {
  newPlayerJoinedAction: (payload: Room) => void
  playerLeftAction: (payload: { playerId: Player['playerId'] }) => void
}

export default function useGame() {
  console.log('useGame rendered')
  const context = useContext(GameContext)

  if (context === undefined) {
    throw new Error('useGame must be used inside a GameProvider wrapper')
  }

  const { state, dispatch } = context
  const navigate = useNavigate()
  const incomingEventActions: IncomingEventActions = useMemo(
    () => ({
      newPlayerJoinedAction: (payload: Room) => {
        dispatch({
          type: ACTION.NEW_PLAYER_JOINED,
          payload,
        })
      },
      playerLeftAction: (payload) => {
        dispatch({
          type: ACTION.PLAYER_LEFT,
          payload,
        })
      },
    }),
    []
  )
  const gameService = useMemo(() => gameServiceCreator(incomingEventActions), [])

  return {
    state,

    createGameAndJoin: async ({
      nickname,
      rounds,
      maxPlayers,
    }: {
      nickname: string
      rounds: number
      maxPlayers: number
    }) => {
      const { room: _room } = await gameService.createGame({
        rounds,
        maxPlayers,
      })
      const { room, player } = await gameService.joinTheGame({
        nickname,
        roomId: _room.roomId,
      })

      joinedTheGameAction(dispatch, { room, player })
      navigate('/play')
    },

    joinGame: async ({
      nickname,
      roomId,
    }: {
      nickname: string
      roomId: string
    }) => {
      const { room, player } = await gameService.joinTheGame({
        nickname,
        roomId,
      })

      joinedTheGameAction(dispatch, { room, player })
      navigate('/play')
    },

    exitGame: async ({
      playerId,
      roomId,
    }: {
      playerId: string
      roomId: string
    }) => {
      await gameService.exitGame({ playerId, roomId })
      leftGameAction(dispatch)
      navigate('/')
    },
  }
}

function joinedTheGameAction(dispatch: Dispatch, payload: unknown) {
  dispatch({
    type: ACTION.JOINED_THE_GAME,
    payload,
  })
}

function leftGameAction(dispatch: Dispatch) {
  dispatch({
    type: ACTION.LEFT_GAME,
  })
}

function errorThrownAction(dispatch: Dispatch, payload: unknown) {
  dispatch({
    type: ACTION.ERROR_THROWN,
    payload,
  })
}
