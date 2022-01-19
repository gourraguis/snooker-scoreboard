import { Socket } from 'socket.io-client'

export interface ServerToClientEvents {
  newGame: () => void
}

export type BoardSocket = Socket<ServerToClientEvents, ClientToServerEvents>
