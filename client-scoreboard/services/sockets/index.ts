import { SetterOrUpdater } from 'recoil'
import { io } from 'socket.io-client'
import { IBoard } from '../../types/board'
import { IGame } from '../../types/game'
import { getApiEndpoint } from '../config'
import { BoardSocket } from './types/sockets'

const socket: BoardSocket = io(`${getApiEndpoint()}/board`)

export const initSocket = (
  startNewGame: (game: IGame) => void,
  setBoard: SetterOrUpdater<IBoard | null>,
  id: string,
  updatePlayerName: (game: IGame) => void,
  sendGameData: (game: IGame) => void
) => {
  socket.on('connect', () => {
    socket.emit('initBoard', id, setBoard)
    console.log('Connected to server')
  })

  socket.on('disconnect', () => console.error('Disconnected from server'))

  socket.on('initGame', startNewGame)

  socket.on('getBoardsData', sendGameData)

  socket.on('updatePlayerName', (game) => {
    updatePlayerName(game)
  })
}

export const emitUpdateGame = (game: IGame) => {
  socket.emit('updateGame', game)
}
