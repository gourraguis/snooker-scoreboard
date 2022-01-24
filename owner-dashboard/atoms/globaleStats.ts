import { atom } from 'recoil'

export const dailyStats = atom<number>({
  key: 'dailyStats',
  default: 27,
})

export const weeklyStats = atom<number>({
  key: 'weeklyStats',
  default: 340,
})