import { atom } from 'recoil';
import { IPlayer } from '../types/Player';

export const playersState = atom<IPlayer[]>({
  key: 'user',
  default: [],
});

export const currentPlayerIdState = atom<string>({
  key: 'playerId',
  default: '',
});
