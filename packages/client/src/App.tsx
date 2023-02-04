import AppRouter from './routes/AppRouter'
import { GameProvider } from './contexts/game.context'

function App() {
  return (
    <GameProvider>
      <AppRouter />
    </GameProvider>
  )
}

export default App
