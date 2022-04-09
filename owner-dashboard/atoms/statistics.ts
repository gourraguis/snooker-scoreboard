import { atom } from 'recoil'
import { IStatistics } from '../types/statistics'

export const statisticsState = atom<IStatistics[]>({
  key: 'statisticsState',
  default: [],
})
