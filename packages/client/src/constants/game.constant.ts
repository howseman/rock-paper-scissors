export const GAME = {
  MIN_ALLOWED_ROUNDS: 1,
  MAX_ALLOWED_ROUNDS: 10,
  MIN_ALLOWED_PLAYERS: 2,
  MAX_ALLOWED_PLAYERS: 2,
  STATUSES: ['non-started', 'ongoing', 'paused', 'terminated'],
  ALLOWED_MOVES: ['rock', 'paper', 'scissors'],
} as const
