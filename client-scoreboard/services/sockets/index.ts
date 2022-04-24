import { SetterOrUpdater } from 'recoil'
import { io } from 'socket.io-client'
import { IBoard } from '../../types/board'
import { IGame } from '../../types/game'
import { getApiEndpoint } from '../config'
import { BoardSocket } from './types/sockets'

const socket: BoardSocket = io(`${getApiEndpoint()}board`)

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('disconnect', () => {
  console.log('Disconnected to server')
})

export const initSocket = (
  startNewGame: (game: IGame) => void,
  setBoard: SetterOrUpdater<IBoard | null>,
  id: string,
  updatePlayerName: (game: IGame) => void,
  endGame: () => void
) => {
  socket.on('initGame', startNewGame)

  socket.on('endGame', endGame)

  socket.on('updatePlayerName', (game) => {
    updatePlayerName(game)
  })

  socket.emit('initBoard', id, setBoard)
}

export const emitUpdateGame = (game: IGame) => {
  socket.emit('updateGame', game)
}
