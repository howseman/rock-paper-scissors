import { Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from '../pages/Home'
import JoinGamePage from '../pages/JoinGame'
import NewGamePage from '../pages/NewGame'

export default function AppRouter() {
  console.log('AppRouter rendered!')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewGamePage />} />
        <Route path="/join" element={<JoinGamePage />} />
      </Routes>
    </BrowserRouter>
  )
}
