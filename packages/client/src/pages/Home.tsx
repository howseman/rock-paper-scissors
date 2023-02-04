import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

export default function HomePage() {
  console.log('🍲 HomePage rendered!')

  useEffect(() => {
    // fetch(`${API_URL}/status`)
    //   .then((res) => res.json())
    //   .then(({ data }) => console.log(data))
  }, [])

  return (
    <>
      <Link to="/new" className="btn block">
        New Game
      </Link>
      <Link to="/join" className="btn block">
        Join Game
      </Link>
    </>
  )
}
