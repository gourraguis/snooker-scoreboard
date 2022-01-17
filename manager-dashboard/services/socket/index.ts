import { SetterOrUpdater } from 'recoil'
import { io } from 'socket.io-client'
import { IBoard } from '../../types/Board'
import { ManagerSocket } from '../../types/Sockets'

const socket: ManagerSocket = io('localhost:5000/manager')

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('disconnect', () => {
  console.error('Disconnected from server')
})

export const initSocket = (setBoard: SetterOrUpdater<IBoard[]>) => {
  socket.on('boardsList', setBoard)
}

export const emitNewGame = (boardId: string) => {
  socket.emit('newGame', { boardId }, console.log)
}
