import { atom } from 'recoil'
import { ICardElements } from '../types/cardElement'

export const tablesStats = atom<ICardElements[]>({
  key: 'tablesStats',
  default: [],
})

export const managersStats = atom<ICardElements[]>({
  key: 'managersStats',
  default: [],
})
