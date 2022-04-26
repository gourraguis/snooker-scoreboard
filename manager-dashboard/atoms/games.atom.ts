import { atom, atomFamily, selector } from 'recoil'
import { IGame } from '../types/game'
import { playersNamesState } from './playersNames.atom'

export const gameStateFamily = atomFamily<IGame | null, string>({
  key: 'gameState',
  default: null,
})

export const gameSelector = selector<IGame | null>({
  key: 'gameSelector',
  get: () => null,
  set: ({ get, set }, game) =>
    set(gameStateFamily((game as IGame).boardId), () => {
      const playersNames = get(playersNamesState)
      if (!playersNames?.length) {
        set(
          playersNamesState,
          (game as IGame).players.map((player) => player.name)
        )
      }
      return game
    }),
})

export const timerState = atom<boolean>({
  key: 'timerState',
  default: false,
})
