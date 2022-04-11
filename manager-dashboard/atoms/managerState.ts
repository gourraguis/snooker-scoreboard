import { atom } from 'recoil'
import { IManager } from '../types/manager'

export const managerState = atom<IManager | null>({
  key: 'managerState',
  default: null,
})
