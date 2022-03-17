import moment from 'moment'
import { atom, selector, SetterOrUpdater } from 'recoil'
import { IGame } from '../types/game'

export const gamesState = atom<IGame[]>({
  key: 'gamesState',
  default: [],
})

export const timerState = atom<boolean>({
  key: 'timerState',
  default: false,
})

export const gameForBoardIdSelector = (boardId: string) =>
  selector<IGame | null>({
    key: `gameForBoardIdSelector:${boardId}`,
    get: ({ get }) => {
      const games = get(gamesState)
      const boardGames = games.filter((game) => game.boardId === boardId)
      if (!boardGames?.length) return null

      return boardGames.reduce((prev, curr) => (moment(curr.startedAt).isAfter(prev.startedAt) ? curr : prev))
    },
  })

export const addGameAction = (setGames: SetterOrUpdater<IGame[]>) => (game: IGame) => {
  setGames((games) => [...games, game])
}

export const updateGameAction = (setGames: SetterOrUpdater<IGame[]>) => (game: IGame) => {
  setGames((games) => [...games.filter(({ id }) => id !== game.id), game])
}
