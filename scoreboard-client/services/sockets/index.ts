import { io } from 'socket.io-client'
import { ManagerSocket } from '../../types/Sockets'

const socket: ManagerSocket = io('localhost:5000/board')

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('disconnect', () => {
  console.error('Disconnected from server')
})

// TODO: change any
export const initSocket = (setNewGame: any) => {
  socket.on('newGame', setNewGame)
}
