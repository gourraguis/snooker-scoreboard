import { atom } from 'recoil'
import { ICardElements } from '../types/cardElement'

export const tableStats = atom<ICardElements[]>({
  key: 'tableStats',
  default: [],
})
