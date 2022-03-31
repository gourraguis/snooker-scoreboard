import { atom } from 'recoil'
import { IStatiscis } from '../types/statistics'

export const statisticsState = atom<IStatiscis[]>({
  key: 'statisticsState',
  default: [],
})
