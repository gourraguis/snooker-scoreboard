export interface IPlayer {
  name: string
  turn: 0 | 1
  score?: number
}

export interface IPlayersNames {
  boardId: string
  firstPlayer?: string
  secondPlayer?: string
}
