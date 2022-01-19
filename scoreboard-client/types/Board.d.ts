export interface EPlayer {
  color: string
  turn: 0 | 1
  name: string
  points: number
}

export interface IBoard {
  id: string
  name: string
  startedAt: Date
  players: EPlayer[]
}
