import { IPlayer } from './player'

export interface IBoard {
  id: string
  name: string
  startedAt: Date
  players: IPlayer[]
}
