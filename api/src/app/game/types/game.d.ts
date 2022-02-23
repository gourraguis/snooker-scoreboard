import { ITurn } from '../../types/turn'
import { IPlayer } from '../../types/player'

export interface IGame {
  id: string
  boardId: string
  players: IPlayer[]
  startedAt: Date
  finishedAt: Date
  // history is not persistent. We only use it for current games but don't save it on DB
  history?: ITurn[]
}

export interface IGameDB {
  id: string
  boardId: string
  ownerId: string
  managerId: string
  winner: string
  loser: string
  startedAt: Date
  finishedAt: Date
}
