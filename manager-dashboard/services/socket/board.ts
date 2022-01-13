import { io } from 'socket.io-client'
import { IBoard } from '../../common/types/Board'

const socketBoard = io('localhost:5000/board')

const onGetBoard = (data: IBoard) => {
  console.log(data)
}
const onMessage = (serverMessage: string) => {
  console.log(serverMessage)
}

socketBoard.on('board', onGetBoard)
socketBoard.on('newGame', onMessage)

const getBoard = () => {
  socketBoard.emit('board')
}

const startGame = () => {
  socketBoard.emit('newGame')
}

export default {
  getBoard,
  startGame,
}
