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

export const initSocket = (setNewGame: SetterOrUpdater<void>) => {
  socket.on('newGame', setNewGame)
}

export const emitUpdateGame = (board: IBoard) => {
  socket.emit('updateGame', board)
}
