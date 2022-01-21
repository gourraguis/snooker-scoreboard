import { ITurn } from './turn'
import { IPlayer } from './player'

export interface IBoard {
  id: string
  name: string
  startedAt: Date
  playersScore: number[]
  history: ITurn[]
  players: IPlayer[]
}
