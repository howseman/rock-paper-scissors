// Later it can be a Redis instance or a DB
const rooms = new Map()

class RoomDataService {
  constructor() {
    console.log('New DataService created!')
  }

  saveRoom(room) {
    rooms.set(room.roomId, room)

    return rooms.get(room.roomId)
  }
  getRoom(roomId) {
    return rooms.get(roomId)
  }
  removeRoom(roomId) {
    return rooms.delete(roomId)
  }
  getAll() {
    return rooms
  }
}

export const dataService = new RoomDataService()
