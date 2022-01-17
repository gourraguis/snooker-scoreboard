import { Socket } from 'socket.io-client'
import { IBoard } from './Board'

export interface ServerToClientEvents {
  newGame: () => void
}

export type ManagerSocket = Socket<ServerToClientEvents, ClientToServerEvents>
