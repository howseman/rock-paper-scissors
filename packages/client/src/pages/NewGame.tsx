import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GAME } from '../constants/game.constant'
import useGame from '../hooks/useGame'

export default function NewGamePage() {
  const { createGameAndJoin } = useGame()
  const [nickname, setNickname] = useState<string>('')
  const [rounds, setRounds] = useState<string>(`${GAME.MIN_ALLOWED_ROUNDS}`)

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isFormDataValid({ nickname, rounds })) {
      createGameAndJoin({
        nickname,
        rounds: +rounds,
        maxPlayers: GAME.MIN_ALLOWED_PLAYERS,
      })
    }
  }

  console.log('🍲 NewGamePage rendered!')

  return (
    <div className="content">
      <h2>New Game</h2>
      <form onSubmit={(event) => formSubmit(event)}>
        <label htmlFor="nickname">
          Your Nickname:
          <input
            type="text"
            name="nickname"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="maxRounds">
          Rounds:
          <input
            type="number"
            name="maxRounds"
            id="maxRounds"
            max={GAME.MAX_ALLOWED_ROUNDS}
            min={GAME.MIN_ALLOWED_ROUNDS}
            value={rounds}
            onChange={(e) => setRounds(e.target.value)}
          />
        </label>
        <div>
          <button type="submit" className="btn">
            Start Game
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

function isFormDataValid({ nickname, rounds }) {
  // FIXME: Add real form validations
  return true
}
