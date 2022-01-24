import { ITurn } from './turn'
import { IPlayer } from './player'

export interface IBoard {
  id: string
  name: string
  players: IPlayer[]
  startedAt?: Date
  history?: ITurn[]
}
