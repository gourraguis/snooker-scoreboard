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
    return _.last(playingHistory.filter(({ undoed }) => undoed === false))!
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
    const scoreHistory = get(historyState).filter(({ undoed }) => undoed === false)

    const playerZeroScore = scoreHistory
      .filter(({ value }) => value === 0)
      .reduce((acc, turn) => {
        const turnScore = turn.scoredBalls.reduce((acc2, val) => acc2 + val, 0)
        return acc + turnScore
      }, 0)

    const playerOneScore = scoreHistory
      .filter(({ value }) => value === 1)
      .reduce((acc, turn) => {
        const turnScore = turn.scoredBalls.reduce((acc2, val) => acc2 + val, 0)
        return acc + turnScore
      }, 0)

    return [playerZeroScore, playerOneScore]
  },
})
