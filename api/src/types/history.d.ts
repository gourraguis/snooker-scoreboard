export enum EBall {
  RED = 1,
  YELLOW = 2,
  GREEN = 3,
  BROWN = 4,
  BLUE = 5,
  PINK = 6,
  BLACK = 7,
}

export interface ITurn {
  value: 0 | 1
  scoredBalls: EBall[]
}
