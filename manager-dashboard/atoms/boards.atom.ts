import { atom, SetterOrUpdater } from 'recoil'
import { IBoard } from '../types/board'

export const boardsState = atom<IBoard[]>({
  key: 'boardsState',
  default: [],
})

export const addBoardAction = (setBoards: SetterOrUpdater<IBoard[]>) => (board: IBoard) => {
  setBoards((boards) => [...boards, board])
}
