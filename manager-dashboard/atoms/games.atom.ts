import { atom, atomFamily, selector, SetterOrUpdater } from 'recoil'
import { IGame } from '../types/game'

export const gameStateFamily = atomFamily<IGame | null, string>({
  key: 'gameState',
  default: null,
})

export const gameSelector = selector<IGame | null>({
  key: 'gameState',
  get: ({ get }) => null,
  set: ({ set }, game) => set(gameStateFamily((game as IGame).boardId), game),
})

export const timerState = atom<boolean>({
  key: 'timerState',
  default: false,
})
