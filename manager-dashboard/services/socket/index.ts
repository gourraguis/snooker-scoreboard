import { SetterOrUpdater } from 'recoil'
import { io, Socket } from 'socket.io-client'
import { IBoard } from '../../common/types/Board'
import { ClientToServerEvents, ServerToClientEvents } from '../../common/types/sockets'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('localhost:5000/manager')

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('disconnect', () => {
  console.error('Disconnected from server')
})

export const initSocket = (setBoard: SetterOrUpdater<IBoard[]>) => {
  socket.on('fetchBoardsList', setBoard)
  socket.emit('fetchBoardsList')
}

const onStartNewGame = (isSuccesfull: boolean) => {
  console.log(isSuccesfull)
}
socket.on('startNewGame', onStartNewGame)
export const startGame = () => {
  socket.emit('startNewGame')
}
