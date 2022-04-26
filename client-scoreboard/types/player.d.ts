export interface IPlayer {
  name: string
  turn: 0 | 1
  score?: number
}

export interface IPlayersNames {
  firstPlayer?: string
  secondPlayer?: string
}
