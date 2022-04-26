export interface IStats {
  table: string
  manager: string
  winner: number
  loser: number
  startedAt: Date
  finishedAt: Date
  duration: Date
}

export interface IStatsFilter {
  managerId?: string
  boardId?: string
  startDate?: Date
  finishDate?: Date
}
