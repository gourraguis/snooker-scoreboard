import { SetterOrUpdater } from 'recoil'
import { io } from 'socket.io-client'
import { IBoard } from '../../types/board'
import { BoardSocket } from './types/sockets'

const socket: BoardSocket = io('localhost:5000/board')

export const initSocket = (startNewGame: SetterOrUpdater<void>, setBoard: SetterOrUpdater<IBoard | null>) => {
  socket.on('connect', () => {
    const dummyBoardId = Math.floor(Math.random() * 1000).toString()
    socket.emit('initBoard', dummyBoardId, setBoard)
    console.log('Connected to server')
  })

  socket.on('disconnect', () => console.error('Disconnected from server'))

  socket.on('newGame', startNewGame)
}

export const emitUpdateBoard = (board: IBoard) => {
  socket.emit('updateBoard', board)
}
