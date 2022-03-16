import { atom, selector, SetterOrUpdater } from 'recoil'
import { emitUpdateGame } from '../services/sockets'
import { IGame } from '../types/game'
import { IPlayer, IPlayersNames } from '../types/player'
import { ITurn } from '../types/turn'

export const gameState = atom<IGame | null>({
  key: 'gameState',
  default: null,
})

export const timerState = atom<boolean>({
  key: 'timerState',
  default: false,
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

export const sendGameData =
  (setGame: SetterOrUpdater<IGame | null>, setHistory: SetterOrUpdater<ITurn[]>) => async () => {
    let playerZeroScore: number
    let playerOneScore: number
    const historyData: ITurn[] = await new Promise((resolve) => {
      setHistory((oldHistory: ITurn[]) => {
        playerZeroScore = oldHistory
          .filter(({ value }) => value === 0)
          .reduce((acc, turn) => {
            const turnScore = turn.scoredBalls.reduce((acc2, val) => acc2 + val, 0)
            return acc + turnScore
          }, 0)

        playerOneScore = oldHistory
          .filter(({ value }) => value === 1)
          .reduce((acc, turn) => {
            const turnScore = turn.scoredBalls.reduce((acc2, val) => acc2 + val, 0)
            return acc + turnScore
          }, 0)
        resolve(oldHistory)
        return oldHistory
      })
    })

    setGame((oldGame: IGame | null) => {
      if (oldGame) {
        const players: IPlayer[] = [
          {
            name: oldGame.players[0].name || '',
            turn: oldGame.players[0].turn,
            score: playerZeroScore,
          },
          {
            name: oldGame.players[1].name || '',
            turn: oldGame.players[1].turn,
            score: playerOneScore,
          },
        ]
        const newGame = {
          id: oldGame.id,
          boardId: oldGame.boardId,
          players,
          startedAt: oldGame.startedAt,
          finishedAt: oldGame.finishedAt,
          history: historyData.slice(0, -1),
        }
        emitUpdateGame(newGame)
        return newGame
      }
      return null
    })
  }

export const stopTimerAction = (stopTimer: SetterOrUpdater<boolean>) => async () => {
  stopTimer(true)
}
