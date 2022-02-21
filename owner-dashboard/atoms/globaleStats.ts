import { atom } from 'recoil'

export const dailyStats = atom<number>({
  key: 'dailyStats',
  default: 0,
})

export const weeklyStats = atom<number>({
  key: 'weeklyStats',
  default: 0,
})
