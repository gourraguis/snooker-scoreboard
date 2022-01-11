import { atom } from 'recoil';
import { IPlayer } from '../types/Player';

export const playersState = atom<IPlayer[]>({
  key: 'players',
  default: [
    {
      color: 'text-red-800',
      turn: 0,
    },
    {
      color: 'text-blue-800',
      turn: 1,
    },
  ],
});
