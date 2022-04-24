import { ITurn } from './turn'
import { IPlayer } from './player'

export interface IGame {
  id?: string
  boardId: string
  players: IPlayer[]
  startedAt: Date
  finishedAt: Date
  history?: ITurn[]
  updatedAt?: Date
}
