import { io, Socket } from 'socket.io-client'
import { IncomingEventActions } from '../hooks/useGame'
import { Room, Player } from '../types/Room'

const API_URL = import.meta.env.VITE_API_URL

type EventResult<T> = [Error | null, T]

class GameService {
  private socket: Socket

  constructor(
    private readonly incomingEventActionCreators: IncomingEventActions
  ) {
    console.log('new GameService instance', this)
  }

  createGame({
    rounds,
    maxPlayers,
  }: {
    rounds: number
    maxPlayers?: number
  }): Promise<{ room: Room }> {
    if (!this.socket) {
      this.initSocketConnection()
    }

    return new Promise((resolve, reject) => {
      this.socket.emit(
        'create_game',
        { rounds, maxPlayers },
        (result: EventResult<{ room: Room }>) => {
          // console.log('YES create_game:', JSON.stringify(result, null, 2))
          handleResult(result, resolve, reject)
        }
      )
    })
  }

  joinTheGame({
    nickname,
    roomId,
  }: {
    nickname: string
    roomId: string
  }): Promise<{ room: Room; player: Player }> {
    if (!this.socket) {
      this.initSocketConnection()
    }

    return new Promise((resolve, reject) => {
      this.socket.emit(
        'join_game',
        { nickname, roomId },
        (result: EventResult<{ room: Room; player: Player }>) => {
          // console.log('YES join_game:', JSON.stringify(result, null, 2))
          handleResult(result, resolve, reject)
        }
      )
    })
  }

  exitGame({
    playerId,
    roomId,
  }: {
    playerId: string
    roomId: string
  }): Promise<{ result: 'success' }> {
    console.log('received:', { playerId, roomId, socket: this.socket })

    if (!this.socket) {
      return Promise.resolve({ result: 'success' })
    }

    return new Promise((resolve, reject) => {
      this.socket.emit(
        'exit_game',
        { playerId, roomId },
        (result: EventResult<{ result: 'success' }>) => {
          console.log('YES exit_game:', JSON.stringify(result, null, 2))
          this.socket.disconnect()
          handleResult(result, resolve, reject)
        }
      )
    })
  }

  private initSocketConnection() {
    this.socket = io(API_URL, { forceNew: false, path: '/game' })
    this.initEventHandlers()
  }

  private initEventHandlers() {
    this.socket.on('player_joined', (args: EventResult<{ room: Room }>) => {
      console.log('player_joined', args)
      const [, { room }] = args
      this.incomingEventActionCreators.newPlayerJoinedAction(room)
    })
    this.socket.on(
      'player_left',
      (
        args: EventResult<{
          playerId: Player['playerId']
        }>
      ) => {
        console.log('player_left', args)
        const [, { playerId }] = args
        this.incomingEventActionCreators.playerLeftAction({ playerId })
      }
    )

    this.socket
      .on('connect', () => {
        console.log('ON connect - socket.id:', this.socket?.id)
      })
      .on('connect_error', () => {
        console.log('ON connect_error - socket.id:', this.socket?.id)
      })
      .on('disconnect', () => {
        console.log('ON disconnect - socket.id:', this.socket?.id)
      })

    this.socket.io
      .on('error', (error) => {
        console.log('WS ERROR:', error)
      })
      .on('reconnect_attempt', () => {
        console.log('ON reconnect_attempt')
      })
      .on('reconnect', () => {
        console.log('ON reconnect')
      })
  }
}

function handleResult<T>(
  result: EventResult<T>,
  resolve: (value: T) => void,
  reject: (reason?: unknown) => void
) {
  if (!Array.isArray(result)) {
    reject('Something wrong has happened!')
  }
  if (result[0] === null) {
    resolve(result[1])
  } else {
    reject(result[0])
  }
}

let gameService: GameService | null = null

export default function gameServiceCreator(
  incomingEventActionCreators: IncomingEventActions
) {
  if (!gameService) {
    gameService = new GameService(incomingEventActionCreators)
  }
  return gameService
}
