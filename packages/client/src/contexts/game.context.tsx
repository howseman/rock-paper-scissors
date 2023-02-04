import { createContext, ReactNode, useReducer } from 'react'
import { gameInitialState, gameReducer } from './gameReducer'
import { State, Dispatch } from './State'

export const GameContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, gameInitialState)
  const value = { state, dispatch }
  console.log('GameProvider rendered')

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
