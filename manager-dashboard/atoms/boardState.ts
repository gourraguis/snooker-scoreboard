import { atom } from 'recoil'
import { IBoard } from '../types/Board'

export const boardsState = atom<IBoard[]>({
  key: 'boardsState',
  default: [],
})
