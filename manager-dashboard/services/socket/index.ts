import { io } from 'socket.io-client'
import { openNotification } from '../notification'
import { IBoard } from '../../types/board'
import { ManagerSocket } from './types/sockets'

const socket: ManagerSocket = io('http://localhost:5000/manager')

socket.on('connect', () => console.log(`socket connected`))
socket.on('disconnect', () => console.error(`socket disconnected`))

export const initSocket = (addBoard: (board: IBoard) => void, updateBoard: (board: IBoard) => void) => {
  // TODO: Refactor using atoms setBoards and setBoard
  socket.on('newBoard', (board) => {
    addBoard(board)
  })
  socket.on('updateBoard', (board) => {
    updateBoard(board)
  })
}

export const emitNewGame = (boardId: string) => {
  socket.emit('newGame', { boardId }, () => {
    openNotification({
      title: 'Une nouvelle partie a été lancé',
    })
  })
}
