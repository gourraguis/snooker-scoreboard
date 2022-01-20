import { IPlayer } from './player'

export interface IBoard {
  id: string
  name: string
  startedAt: Date
  playersPoints: [number, number]
  history: ITurn[]
  players: IPlayer[]
}
