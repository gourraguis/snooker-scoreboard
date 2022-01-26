import { atom } from 'recoil'
import { IBoard } from '../types/board'

export const boardState = atom<IBoard | null>({
  key: 'boardState',
  default: null,
})
