import { IPlayer } from './Player'

export interface IBoard {
  tableName: string
  startedAt: string
  players: IPlayer[]
}
