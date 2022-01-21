import { atom } from 'recoil'
import { ICardElements } from '../types/cardElement'

export const tablesStats = atom<ICardElements[]>({
  key: 'tablesStats',
  default: [
    {
      name: 'Table1',
      dailyScore: 22,
      weeklyScore: 333,
    },
    {
      name: 'Table2',
      dailyScore: 54,
      weeklyScore: 542,
    },
  ],
})

export const managersStats = atom<ICardElements[]>({
  key: 'managersStats',
  default: [
    {
      name: 'Mounir',
      dailyScore: 34,
      weeklyScore: 123,
    },
    {
      name: 'Ahmad',
      dailyScore: 12,
      weeklyScore: 99,
    },
  ],
})
