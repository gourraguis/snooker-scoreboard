import { EBall } from './ball'

export interface ITurn {
  value: 0 | 1
  scoredBalls: EBall[]
  undoed: boolean
}
