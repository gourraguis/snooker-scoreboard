import { EBall } from '../types/ball.d'

const ballsColor = {
  [EBall.RED]: 'rgb(153 27 27)',
  [EBall.YELLOW]: 'rgb(250 204 21)',
  [EBall.GREEN]: 'rgb(101 163 13)',
  [EBall.BROWN]: 'rgb(120 53 15)',
  [EBall.BLUE]: 'rgb(37 99 235)',
  [EBall.PINK]: 'rgb(249 168 212)',
  [EBall.BLACK]: 'rgb(0 0 0)',
}

export const balls = [EBall.RED, EBall.YELLOW, EBall.GREEN, EBall.BROWN, EBall.BLUE, EBall.PINK, EBall.BLACK]

export const getBallColor = (value: EBall): string => ballsColor[value] || 'grey'
