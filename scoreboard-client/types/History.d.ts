import { EBallValue } from './ball'

export interface ITurn {
  value: 0 | 1
  scoredBalls: EBallValue[]
}
