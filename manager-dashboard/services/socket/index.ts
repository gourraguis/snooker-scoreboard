import { io, Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from '../../common/types/sockets'

const socket: Socket<ClientToServerEvents, ServerToClientEvents> = io('localhost:5000/app')

const onMessage = (serverMessage: string) => {
  console.log(serverMessage)
}

socket.on('connect', () => {
  console.log('Connected to server')
})

// socket.on('connect_error', () => {
//   console.error('Failed to connect to server')
// })

socket.on('disconnect', () => {
  console.error('Disconnected from server')
})

socket.on('message', onMessage)

export const emitMessage = (clientMessage: string) => {
  socket.emit('message', clientMessage)
}
