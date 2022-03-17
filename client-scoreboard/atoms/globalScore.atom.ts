import { atom, SetterOrUpdater } from 'recoil'
import { IGame } from '../types/game'
import { IGlobalScore } from '../types/globalScore'
import { ITurn } from '../types/turn'

export const globalScoreState = atom<IGlobalScore[]>({
  key: 'globalScoreState',
  default: [],
})

export const addGameAction =
  (
    setGlobalScoreState: SetterOrUpdater<IGlobalScore[]>,
    startNewGame: SetterOrUpdater<IGame | null>,
    history: SetterOrUpdater<ITurn[]>,
    setStopTimer: SetterOrUpdater<boolean>
  ) =>
  (game: IGame) => {
    let playerZeroScore = 0
    let playerOneScore = 0

    history((oldHistory) => {
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

      return [
        {
          value: 0,
          scoredBalls: [],
          undoed: false,
        },
      ]
    })
    setGlobalScoreState((oldGlobalState) => {
      if (
        oldGlobalState[0]?.playerName === game.players[0].name &&
        oldGlobalState[1]?.playerName === game.players[1].name
      ) {
        if (playerZeroScore > playerOneScore) {
          return [
            {
              playerName: game.players[0].name,
              score: oldGlobalState[0].score + 1,
            },
            {
              playerName: game.players[1].name,
              score: oldGlobalState[1].score,
            },
          ]
        }
        if (playerZeroScore < playerOneScore) {
          return [
            {
              playerName: game.players[0].name,
              score: oldGlobalState[0].score,
            },
            {
              playerName: game.players[1].name,
              score: oldGlobalState[1].score + 1,
            },
          ]
        }
        if (playerZeroScore === playerOneScore) {
          return [
            {
              playerName: game.players[0].name,
              score: oldGlobalState[0].score,
            },
            {
              playerName: game.players[1].name,
              score: oldGlobalState[1].score,
            },
          ]
        }
      }
      return [
        {
          playerName: game.players[0].name,
          score: 0,
        },
        {
          playerName: game.players[1].name,
          score: 0,
        },
      ]
    })
    startNewGame(game)
    setStopTimer(false)
  }
