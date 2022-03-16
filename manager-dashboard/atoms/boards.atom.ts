/* eslint-disable no-plusplus */
import { atom, SetterOrUpdater } from 'recoil'
import { IBoard } from '../types/board'

export const boardsState = atom<IBoard[]>({
  key: 'boardsState',
  default: [],
})

export const addBoardAction = (setBoards: SetterOrUpdater<IBoard[]>) => (board: IBoard) => {
  setBoards((boards) => {
    const arr: IBoard[] = []
    let same = false
    for (let index = 0; index < boards.length; index++) {
      if (boards[index].id === board.id) {
        same = true
        arr[index] = board
      } else {
        arr[index] = boards[index]
      }
    }
    if (same) {
      return arr
    }

    return [...boards, board]
  })
}

export const removeBoardAction = (setBoards: SetterOrUpdater<IBoard[]>) => (board: IBoard) => {
  setBoards((boards) => [...boards.filter(({ id }) => id !== board.id)])
}
