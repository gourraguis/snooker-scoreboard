import { atom } from 'recoil';

export const selectedBallState = atom({
  key: 'lastBall',
  default: {
    color: '',
    val: 0,
  },
});

export const scoreState = atom({
  key: 'score',
  default: {
    val: 0,
  },
});
