import { Server, Socket } from 'socket.io'
import { IBoard } from './Board'

export interface ServerToClientEvents {
  boardsList: (boards: IBoard[]) => void
}

export interface ClientToServerEvents {
  newGame: (req: { boardId: string }, cb: (res: { error: string }) => void) => void
}

export interface SocketData {
  managerId: string
}

export type ManagerServer = Server<ClientToServerEvents, ServerToClientEvents, unknown, SocketData>

export type ManagerSocket = Socket<ServerToClientEvents, ClientToServerEvents>
