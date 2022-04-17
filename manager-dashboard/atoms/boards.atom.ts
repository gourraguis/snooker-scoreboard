/* eslint-disable no-plusplus */
import { atom, selector, SetterOrUpdater } from 'recoil'
import { IBoard } from '../types/board'

export const managerBoardsState = atom<IBoard[]>({
  key: 'managerBoardsState',
  default: [],
})

export const incrementGamesSelector = selector<string | null>({
  key: 'incrementGamesSelector',
  get: () => null,
  set: ({ set }, boardId) =>
    set(managerBoardsState, (prevBoards) => {
      const playedBoard = { ...prevBoards.find(({ id }) => id === boardId)! }
      playedBoard.dailyGames += 1
      playedBoard.weeklyGames += 1
      return [...prevBoards.filter(({ id }) => id !== boardId), playedBoard]
    }),
})

export const addBoardAction = (setManagerBoards: SetterOrUpdater<IBoard[]>) => (board: IBoard) => {
  setManagerBoards((boards) => {
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

export const removeBoardAction = (setManagerBoards: SetterOrUpdater<IBoard[]>) => (board: IBoard) => {
  setManagerBoards((boards) => [...boards.filter(({ id }) => id !== board.id)])
}
