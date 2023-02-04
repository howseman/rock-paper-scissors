import { v4 as uuidV4 } from 'uuid'

export default class Player {
  constructor(nickname) {
    this.playerId = uuidV4()
    this.nickname = nickname
  }
}
