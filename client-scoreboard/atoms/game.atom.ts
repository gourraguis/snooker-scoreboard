import moment from 'moment'
import { atom, selector, SetterOrUpdater } from 'recoil'
import { emitUpdateGame } from '../services/sockets'
import { IGame } from '../types/game'
import { IPlayer, IPlayersNames } from '../types/player'
import { ITurn } from '../types/turn'
import { historyState, playersScoreSelector } from './history'

export const gameState = atom<IGame | null>({
  key: 'gameState',
  default: null,
})

export const startedAtSelector = selector<Date | null>({
  key: 'startedAtSelector',
  get: ({ get }) => {
    const game = get(gameState)
    return game?.startedAt || null
  },
})

export const formattedGameSelector = selector<IGame | null>({
  key: 'formattedGameSelected',
  get: ({ get }) => {
    const game = get(gameState)
    const history = get(historyState)
    const playersScore = get(playersScoreSelector)
    if (!game) {
      return null
    }
    return {
      boardId: game.boardId,
      players: [
        {
          name: game.players[0].name,
          turn: game.players[0].turn,
          score: playersScore[0],
        },
        {
          name: game.players[1].name || '',
          turn: game.players[1].turn,
          score: playersScore[1],
        },
      ],
      startedAt: game.startedAt,
      finishedAt: game.finishedAt,
      history,
      updatedAt: moment().toDate(),
    }
  },
})

export const updatePlayerNameAction = (setGame: SetterOrUpdater<IGame | null>) => (newPlayers: IPlayersNames) => {
  setGame((prevGame: IGame | null) => {
    if (!prevGame) {
      return null
    }
    return {
      ...prevGame,
      players: [
        {
          ...prevGame.players[0],
          name: newPlayers.firstPlayer || prevGame.players[0].name,
        },
        {
          ...prevGame.players[1],
          name: newPlayers.secondPlayer || prevGame.players[1].name,
        },
      ],
    }
  })
}

export const stopTimerAction = (setGame: SetterOrUpdater<IGame | null>) => async () => {
  setGame(null)
}
