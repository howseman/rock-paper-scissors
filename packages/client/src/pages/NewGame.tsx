import { Link } from 'react-router-dom'

export default function NewGamePage() {
  const startNewGame = () => {
    console.log('start game action called!')
  }

  return (
    <div className="content">
      <header>New Game</header>
      <form onSubmit={() => console.log('Form submitted!')}>
        <label htmlFor="">
          <input type="text" name="nickName" />
        </label>
        <label htmlFor="">
          <input type="number" name="maxRounds" />
        </label>
        <button type="button" onClick={() => startNewGame()}>
          Start Game
        </button>
      </form>
      <Link to="/" className="block">
        Back
      </Link>
    </div>
  )
}
