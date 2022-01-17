import { IPlayer } from './Player'

export interface IBoard {
  id: string
  name: string
  startedAt: Date
  players: IPlayer[]
}
