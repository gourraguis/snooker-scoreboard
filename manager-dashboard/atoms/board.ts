import { atom } from 'recoil'
import { IBoard } from '../types/board'

export const boardsState = atom<IBoard[]>({
  key: 'boardsState',
  default: [],
})
