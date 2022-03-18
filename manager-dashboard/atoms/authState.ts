import { atom } from 'recoil'
import { IManager } from '../types/manager'

export const authState = atom<IManager | null>({
  key: 'auth',
  default: null,
})
