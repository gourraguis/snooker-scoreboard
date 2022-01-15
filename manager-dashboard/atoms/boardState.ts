import { atom } from 'recoil'
import { IBoard } from '../common/types/Board'

export const boardState = atom<IBoard[]>({
  key: 'boardState',
  default: [],
})
