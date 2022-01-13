import { IPlayer } from './Player'

export interface IBoard {
  tableName: string
  startedAt: Date
  players: IPlayer[]
}
