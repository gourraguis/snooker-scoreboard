export enum EBallValue {
  RED = 1,
  YELLOW = 2,
  GREEN = 3,
  BROWN = 4,
  BLUE = 5,
  PINK = 6,
  BLACK = 7,
}

export interface IBall {
  value: EBallValue
  color: string
}
