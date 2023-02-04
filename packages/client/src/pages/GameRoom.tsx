import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GAME } from '../constants/game.constant'
import useGame from '../hooks/useGame'
import { Gameplay, Player } from '../types/Room'

export default function GameRoomPage() {
  console.log('🍲 GameRoomPage rendered!')
  const { state, exitGame } = useGame()
  const navigate = useNavigate()
  const opponents = getOpponents(state.room.players, state.currentPlayer)

  useEffect(() => {
    console.log('STATE:', state)
    if (!state.room.roomId || !state.currentPlayer?.playerId) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <h2>Game Room Page</h2>

      <div>RoomID: {state.room.roomId}</div>
      <div>
        Rounds: {calculateRoundsPlayed(state.room.gameplay)} / {state.room.rounds}
      </div>
      <div>
        Points:
        <div>You: {state.currentPlayer?.nickname}</div>
        <div>Opponent: {opponents[0]?.nickname ?? ''}</div>
      </div>

      <div>
        <button>Rock</button>
        <button>Paper</button>
        <button>Scissors</button>
      </div>

      <div>
        Ready? <button>Yes</button>
      </div>

      <div>
        <button>Pause / Resume</button>
      </div>

      <div>
        <button
          className="btn block"
          onClick={() =>
            exitGame({
              playerId: state.currentPlayer.playerId,
              roomId: state.room.roomId,
            })
          }
        >
          Exit Game
        </button>
      </div>
    </>
  )
}

function getOpponents(allPlayers: Array<Player>, currentPlayer: Player) {
  if (!currentPlayer) {
    return []
  }

  return allPlayers.filter(
    (player) => player.playerId !== currentPlayer.playerId
  )
}

function calculateRoundsPlayed(gameplay: Gameplay): number {
  let roundsPlayed = 0

  if (!gameplay) {
    return roundsPlayed
  }

  const playerIds = Object.keys(gameplay)

  if (playerIds.length < GAME.MIN_ALLOWED_PLAYERS ) {
    return roundsPlayed
  }

  roundsPlayed = gameplay[playerIds[0]].length
  for (let playerIdIndex = 1; playerIdIndex < playerIds.length; playerIdIndex++) {
    if (gameplay[playerIdIndex].length !== roundsPlayed) {
      roundsPlayed = gameplay[playerIdIndex].length < roundsPlayed ? gameplay[playerIdIndex].length : roundsPlayed
    }
  }

  return roundsPlayed
}
