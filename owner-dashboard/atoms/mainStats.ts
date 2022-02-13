import { atom } from 'recoil'
import { ICardElements } from '../types/cardElement'

export const tablesStats = atom<ICardElements[]>({
  key: 'tablesStats',
  default: [
    {
      id: '1',
      name: 'Table1',
      dailyScore: 22,
      weeklyScore: 333,
    },
    {
      id: '2',
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
      id: 'xxx',
      name: 'Mounir',
      dailyScore: 34,
      weeklyScore: 123,
    },
    {
      id: 'ssss',
      name: 'Ahmad',
      dailyScore: 12,
      weeklyScore: 99,
    },
  ],
})
