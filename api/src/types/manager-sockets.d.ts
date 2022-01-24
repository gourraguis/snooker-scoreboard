import { Server, Socket } from 'socket.io'
import { IBoard } from './board'

interface ServerToClientEvents {
  newBoard: (board: IBoard) => void
  updateBoard: (board: IBoard) => void
}

interface ClientToServerEvents {
  newGame: (req: { boardId: string }, cb: () => void) => void
}

interface SocketData {
  managerId: string
}

export type ManagerClientToServerEvents = keyof ClientToServerEvents

export type ManagerServer = Server<ClientToServerEvents, ServerToClientEvents, unknown, SocketData>

export type ManagerSocket = Socket<ServerToClientEvents, ClientToServerEvents, unknown, SocketData>
