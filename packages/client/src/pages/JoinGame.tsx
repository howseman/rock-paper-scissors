import { Link } from 'react-router-dom'

export default function JoinGamePage() {
  const joinGame = () => {
    console.log('Join game action called!')
  }

  return (
    <div className="content">
      <header>Join Game</header>
      <form onSubmit={() => console.log('Form submitted!')}>
        <label htmlFor="">
          <input type="text" name="nickName" />
        </label>
        <label htmlFor="">
          <input type="text" name="matchId" />
        </label>
        <button type="button" onClick={() => joinGame()}>
          Join
        </button>
      </form>
      <Link to="/" className="block">
        Back
      </Link>
    </div>
  )
}
