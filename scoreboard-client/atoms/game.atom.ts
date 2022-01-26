import { atom, selector } from 'recoil'
import { IGame } from '../types/game'

export const gameState = atom<IGame | null>({
  key: 'gameState',
  default: null,
})

export const startedAtSelector = selector<Date>({
  key: 'startedAtSelector',
  get: ({ get }) => {
    const game = get(gameState)!
    return game.startedAt!
  },
})
