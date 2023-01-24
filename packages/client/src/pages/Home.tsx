import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="App">
      <h2>Rock, Paper & Scissors</h2>
      <Link to="/new" className="block">
        Start New Game
      </Link>
      <Link to="/join" className="block">
        Join Game
      </Link>
    </div>
  )
}
