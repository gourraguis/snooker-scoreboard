import { atom, selector } from 'recoil'
import _ from 'underscore'
import { EBall } from '../types/ball'
import { ITurn } from '../types/turn'

export const historyState = atom<ITurn[]>({
  key: 'historyState',
  default: [
    {
      value: 0,
      scoredBalls: [],
      undoed: false,
    },
  ],
})

export const previousTurnsSelector = selector<ITurn[]>({
  key: 'previousTurnsSelector',
  get: ({ get }) => {
    const playingHistory = get(historyState)
    return playingHistory.slice(0, playingHistory.length - 1)
  },
})

export const currentTurnSelector = selector<ITurn>({
  key: 'currentTurnSelector',
  get: ({ get }) => {
    const playingHistory = get(historyState)
    // TODO: 7tha wst return fach tsd9
    const playingHistoryWithoutCancledTurn = playingHistory.filter(({ undoed: cancled }) => cancled === false)

    return _.last(playingHistoryWithoutCancledTurn)!
  },
})

export const currentScoreSelector = selector<number>({
  key: 'currentScoreSelector',
  get: ({ get }) => {
    const currentTurn = get(currentTurnSelector)

    return currentTurn.scoredBalls.reduce((acc, val) => acc + val, 0)
  },
})

export const lastBallSelector = selector<EBall>({
  key: 'lastBallSelector',
  get: ({ get }) => {
    const currentTurn = get(currentTurnSelector)
    return _.last(currentTurn.scoredBalls)!
  },
})

export const playersScoreSelector = selector<number[]>({
  key: 'playersScoreSelector',
  get: ({ get }) => {
    const playingHistoryWithoutCurrentTurn = get(previousTurnsSelector).filter(
      ({ undoed: cancled }) => cancled === false
    )

    const playerZeroScore = playingHistoryWithoutCurrentTurn
      .filter(({ value }) => value === 0)
      .reduce((acc, turn) => {
        const turnScore = turn.scoredBalls.reduce((acc2, val) => acc2 + val, 0)
        return acc + turnScore
      }, 0)

    const playerOneScore = playingHistoryWithoutCurrentTurn
      .filter(({ value }) => value === 1)
      .reduce((acc, turn) => {
        const turnScore = turn.scoredBalls.reduce((acc2, val) => acc2 + val, 0)
        return acc + turnScore
      }, 0)

    return [playerZeroScore, playerOneScore]
  },
})

// export const undoScoreSelector = selector<number>({
//   key: 'undoScoreSelector',
//   get: ({ get }) => {
//     const currentTurn = get(currentTurnSelector)
//     const without = currentTurn.scoredBalls.slice(0, currentTurn.scoredBalls.length - 1)

//     return without.reduce((acc, val) => acc + val, 0)
//   },
// })
