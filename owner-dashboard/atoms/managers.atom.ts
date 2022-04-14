import { atom } from 'recoil'
import { ICardElements } from '../types/cardElement'

export const ownerManagersState = atom<ICardElements[]>({
  key: 'ownerManagersState',
  default: [],
})
