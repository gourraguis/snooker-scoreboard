import { SetterOrUpdater } from 'recoil'
import { io } from 'socket.io-client'
import { openNotification } from '../notification'
import { IBoard } from '../../types/board'
import { ManagerSocket } from './types/sockets'

const socket: ManagerSocket = io('http://localhost:5000/manager')

socket.on('connect', () => console.log(`socket connected`))
socket.on('connect_error', console.error)
socket.on('disconnect', () => console.error(`socket disconnected`))

export const initSocket = (setBoard: SetterOrUpdater<IBoard[]>) => {
  socket.on('boardsList', setBoard)
  let initialBoard: IBoard[]
  socket.on('boardsList', (board) => {
    initialBoard = board
    setBoard(board)
  })
  socket.on('updateBoard', (newBoard) => {
    setBoard([...initialBoard.filter(({ id }) => id !== newBoard.id), newBoard])
  })
}

export const emitNewGame = (boardId: string) => {
  socket.emit('newGame', { boardId }, ({ error }) => {
    if (error) {
      console.error(error)
      openNotification({
        title: 'Impossible de lancer une nouvelle partie',
        type: 'error',
      })
      return
    }
    openNotification({
      title: 'Une nouvelle partie a été lancé',
    })
  })
}
