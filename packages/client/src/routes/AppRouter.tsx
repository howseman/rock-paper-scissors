import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import GameRoomPage from '../pages/GameRoom'
import HomePage from '../pages/Home'
import JoinGamePage from '../pages/JoinGame'
import NewGamePage from '../pages/NewGame'

export default function AppRouter() {
  console.log('AppRouter rendered!')
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="new" element={<NewGamePage />} />
        <Route path="join/:roomId?" element={<JoinGamePage />} />
        <Route path="play" element={<GameRoomPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}
