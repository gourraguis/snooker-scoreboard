import { atom, selector, SetterOrUpdater } from 'recoil'
import { emitUpdateGame } from '../services/sockets'
import { IGame } from '../types/game'
import { IPlayer, IPlayersNames } from '../types/player'

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

export const updateGameAction = (setGame: SetterOrUpdater<IGame | null>) => (newPlayers: IPlayersNames) => {
  setGame((oldGame: IGame | null) => {
    if (oldGame) {
      const players: IPlayer[] = [
        {
          name: newPlayers.firstPlayer || '',
          turn: oldGame.players[0].turn,
          score: oldGame.players[0].score,
        },
        {
          name: newPlayers.secondPlayer || '',
          turn: oldGame.players[1].turn,
          score: oldGame.players[1].score,
        },
      ]

      const newGame = {
        id: oldGame.id,
        boardId: oldGame.boardId,
        players,
        startedAt: oldGame.startedAt,
        finishedAt: oldGame.finishedAt,
        history: oldGame.history,
      }

      return newGame
    }
    return null
  })
}

export const sendGameData = (setGame: SetterOrUpdater<IGame | null>) => () => {
  setGame((oldGame: IGame | null) => {
    // Todo: check why oldGame is empty
    if (oldGame) emitUpdateGame(oldGame)
    return oldGame
  })
}
