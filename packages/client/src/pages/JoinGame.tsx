import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useGame from '../hooks/useGame'

export default function JoinGamePage() {
  const { joinGame } = useGame()
  const { roomId: _roomId } = useParams()
  const [nickname, setNickname] = useState<string>('')
  const [roomId, setRoomId] = useState<string>(_roomId || '')

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isFormDataValid({ nickname, roomId })) {
      joinGame({ nickname, roomId })
    }
  }

  console.log('🍲 JoinGamePage rendered!', { roomId })

  return (
    <div className="content">
      <h2>Join Game</h2>
      <form onSubmit={(event) => formSubmit(event)}>
        <label htmlFor="nickname">
          Nickname:
          <input
            type="text"
            name="nickname"
            id="nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="roomId">
          Game PIN:
          <input
            type="text"
            name="roomId"
            value={roomId}
            autoComplete="off"
            onChange={(e) => setRoomId(e.target.value)}
          />
        </label>
        <div>
          <button type="submit" className="btn">
            Join Game
          </button>
        </div>
      </form>
      <div>
        <Link to="/" className="btn block">
          Back
        </Link>
      </div>
    </div>
  )
}

function isFormDataValid({ nickname, roomId }) {
  // FIXME: Add real form validations
  return true
}
