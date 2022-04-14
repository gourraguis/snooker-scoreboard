import { io } from 'socket.io-client'
import { SetterOrUpdater } from 'recoil'
import { IBoard } from '../../types/board'
import { ManagerSocket } from './types/sockets'
import { IGame } from '../../types/game'
import { IInitBoard } from '../../types/initBoard'
import { getApiEndpoint } from '../config'

const socket: ManagerSocket = io(`${getApiEndpoint()}manager`)

socket.on('disconnect', () => console.error(`socket disconnected`))

export const initSocket = (
  addBoard: (board: IBoard) => void,
  removeBoard: (board: IBoard) => void,
  updateGame: (game: IGame) => void,
  setBoards: SetterOrUpdater<IBoard[]>,
  id: string | null
) => {
  socket.on('connect', () => {
    socket.emit('getBoardsData', id)
  })
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

export const stopTimer = (board: IInitBoard) => {
  socket.emit('stopTimer', board)
}

export const emitUpdatePlayerName = (board: IInitBoard) => {
  socket.emit('updatePlayerName', board)
}
