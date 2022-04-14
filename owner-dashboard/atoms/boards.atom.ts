import { atom } from 'recoil'
import { ICardElements } from '../types/cardElement'

export const ownerBoardsState = atom<ICardElements[]>({
  key: 'ownerBoardsState',
  default: [],
})
