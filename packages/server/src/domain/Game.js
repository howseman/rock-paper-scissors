import { v4 as uuidV4 } from 'uuid'

export default class GameRoom {
  constructor({ rounds, maxPlayers = 2 } = {}) {
    console.log('new GameRoom created')
    this.#initGame({ rounds, maxPlayers })
  }

  #initGame({ rounds, maxPlayers }) {
    this.roomId = uuidV4()
    this.maxPlayers = maxPlayers
    this.rounds = rounds
    this.status = 'non_started'
    this.players = [] // Array<Player>
    this.gamePlay = {}
    return this
  }

  addPlayer(player) {
    // TODO: Verify that the room exists before anything
    // TODO: Validate if the nickname is already in the room
    // TODO: Validate if the game already started no one else can join
    this.players.push(player)
    this.gamePlay[player.playerId] = []
    return player
  }

  removePlayer(playerId) {
    this.players = this.players.filter((player) => player.playerId !== playerId)
  }

  makeMove({ playerId, move }) {
    this.gamePlay[playerId].push(move)

    if (this.haveAllPlayersMoved()) {
      this.status = 'ready'
    }

    return true
  }

  haveAllPlayersMoved() {
    const playerIds = Object.keys(this.gamePlay)
    const numberOfFirstPlayerMoves = playerIds[0].length
    return (
      playerIds.length > 1 &&
      Object.values(this.gamePlay).every(
        (item) => item.length === numberOfFirstPlayerMoves
      )
    )
  }

  #updateStatus() {
    this.status = ''
  }

  getStatus() {
    return this.status
  }
}
