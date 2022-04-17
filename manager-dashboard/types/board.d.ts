export interface IBoard {
  id: string
  name: string
  ownerId: string
  socketId?: string

  dailyGames: number
  weeklyGames: number
}
