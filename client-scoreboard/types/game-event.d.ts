export interface IGameEvent {
  event: 'updatePlayer' | 'endGame' | 'startGame'
  payload: Record<string, unknown>
}
