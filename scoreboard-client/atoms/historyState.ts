import { atom, selector } from 'recoil'
import _ from 'underscore'
import moment from 'moment'
import { ITurn } from '../types/history'
import { EBallValue, IBall } from '../types/ball'
import { balls } from '../utils/balls'

export const startedAtState = atom<Date>({
  key: 'startedAtState',
  default: moment().toDate(),
})

export const playingHistoryState = atom<ITurn[]>({
  key: 'playingHistoryState',
  default: [
    {
      value: 0,
      scoredBalls: [],
    },
  ],
})

export const currentTurnSelector = selector<ITurn>({
  key: 'currentTurn',
  get: ({ get }) => {
    const playingHistory = get(playingHistoryState)

    return _.last(playingHistory)!
  },
})

export const playingHistoryWithoutCurrentTurnSelector = selector<ITurn[]>({
  key: 'playingHistoryWithoutCurrentTurnSelector',
  get: ({ get }) => {
    const playingHistory = get(playingHistoryState)
    return playingHistory.slice(0, playingHistory.length - 1)
  },
})

export const lastBallSelector = selector<IBall>({
  key: 'lastBallSelector',
  get: ({ get }) => {
    const currentTurn = get(currentTurnSelector)
    const lastBallValue: EBallValue = _.last(currentTurn.scoredBalls)!

    return balls.find((ball) => ball.value === lastBallValue)!
  },
})

export const currentScoreSelector = selector<number>({
  key: 'currentScoreSelector',
  get: ({ get }) => {
    const currentTurn = get(currentTurnSelector)

    return currentTurn.scoredBalls.reduce((acc, val) => acc + val, 0)
  },
})

export const playerPointsSelector = selector<number[]>({
  key: 'playerPointsSelector',
  get: ({ get }) => {
    const playingHistoryWithoutCurrentTurn = get(playingHistoryWithoutCurrentTurnSelector)

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