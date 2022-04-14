import { atom } from 'recoil'
import { IStats } from '../types/statistics'

export const dailyGamesState = atom<number>({
  key: 'dailyGames',
  default: 0,
})

export const weeklyGamesState = atom<number>({
  key: 'weeklyGames',
  default: 0,
})

export const statsState = atom<IStats[]>({
  key: 'statsState',
  default: [],
})
