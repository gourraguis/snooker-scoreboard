import { atom, selector } from 'recoil'
import { IBoard } from '../types/board'

export const boardState = atom<IBoard | null>({
  key: 'boardState',
  default: null,
})

export const startedAtSelector = selector<Date>({
  key: 'startedAtSelector',
  get: ({ get }) => {
    const board = get(boardState)!
    return board.startedAt!
  },
})
