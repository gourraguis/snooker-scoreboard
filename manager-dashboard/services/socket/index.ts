import { io } from 'socket.io-client'
import { IBoard } from '../../types/board'
import { ManagerSocket } from './types/sockets'
import { IGame } from '../../types/game'
import { IInitBoard } from '../../types/initBoard'

const socket: ManagerSocket = io('http://localhost:5000/manager')

socket.on('connect', () => {
  console.log('Manager Socket Connected to server')
})
socket.on('disconnect', () => console.error(`socket disconnected`))

export const initSocket = (
  addBoard: (board: IBoard) => void,
  removeBoard: (board: IBoard) => void,
  updateGame: (game: IGame) => void
) => {
  socket.on('addBoard', (board) => {
    addBoard(board)
  })
  socket.on('removeBoard', (board) => {
    removeBoard(board)
  })
  socket.on('updateGame', (game) => {
    updateGame(game)
  })
}

export const emitNewGame = (board: IInitBoard, addGame: (game: IGame) => void) => {
  socket.emit('initGame', board, addGame)
}

export const emitUpdatePlayerName = (board: IInitBoard) => {
  socket.emit('updatePlayerName', board)
}
