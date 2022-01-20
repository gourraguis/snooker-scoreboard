import { ITurn } from './history'
import { IPlayer } from './player'

export interface IBoard {
  id: string
  name: string
  startedAt: Date
  playersPoints: number[]
  history: ITurn[]
  players: IPlayer[]
}
