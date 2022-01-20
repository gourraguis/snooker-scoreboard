import { atom } from 'recoil'
import { IPlayer } from '../types/player'

export const playersState = atom<IPlayer[]>({
  key: 'players',
  default: [
    {
      color: 'text-red-800',
      turn: 0,
      name: 'Harvey Specter',
    },
    {
      color: 'text-blue-800',
      turn: 1,
      name: 'Mike Ross',
    },
  ],
})
