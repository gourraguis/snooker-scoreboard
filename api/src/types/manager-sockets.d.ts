import { Server, Socket } from 'socket.io'
import { IBoard } from './board'

interface ServerToClientEvents {
  boardsList: (boards: IBoard[]) => void
  updateBoard: (board: IBoard) => void
}

interface ClientToServerEvents {
  newGame: (req: { boardId: string }, cb: (res: { error: string }) => void) => void
}

interface SocketData {
  managerId: string
}

export type ManagerClientToServerEvents = keyof ClientToServerEvents

export type ManagerServer = Server<ClientToServerEvents, ServerToClientEvents, unknown, SocketData>

export type ManagerSocket = Socket<ServerToClientEvents, ClientToServerEvents, unknown, SocketData>
