import moment from 'moment'
import { atom, selector, SetterOrUpdater } from 'recoil'
import { IGame } from '../types/game'

export const gamesState = atom<IGame[]>({
  key: 'gamesState',
  default: [],
})

export const gameForBoardIdSelector = (boardId: string) =>
  selector<IGame | null>({
    key: `gameForBoardIdSelector:${boardId}`,
    get: ({ get }) => {
      const games = get(gamesState)
      if (!games?.length) return null

      return games
        .filter((game) => game.boardId === boardId)
        .reduce((prev, curr) => (moment(curr.startedAt).isAfter(prev.startedAt) ? curr : prev))
    },
  })

export const addGameAction = (setGames: SetterOrUpdater<IGame[]>) => (game: IGame) => {
  setGames((games) => [...games, game])
}

export const updateGameAction = (setGames: SetterOrUpdater<IGame[]>) => (game: IGame) => {
  setGames((games) => [...games.filter(({ id }) => id !== game.id), game])
}
