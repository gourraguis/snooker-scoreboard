import { Socket } from 'socket.io-client'
import { IBoard } from './Board'

export interface ServerToClientEvents {
  boardsList: (boards: IBoard[]) => void
}

export interface ClientToServerEvents {
  newGame: ({ boardId: string }, ack: (res: { success: boolean }) => void) => void
}

export type ManagerSocket = Socket<ServerToClientEvents, ClientToServerEvents>
