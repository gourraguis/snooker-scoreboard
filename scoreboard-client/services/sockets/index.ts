import { SetterOrUpdater } from 'recoil'
import { io } from 'socket.io-client'
import { IBoard } from '../../types/Board'
import { BoardSocket } from '../../types/Sockets'

const socket: BoardSocket = io('localhost:5000/board')

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('disconnect', () => {
  console.error('Disconnected from server')
})

export const initSocket = (startNewGame: SetterOrUpdater<void>) => {
  socket.on('newGame', startNewGame)
}

export const emitUpdateBoard = (board: IBoard) => {
  socket.emit('updateBoard', board)
}
