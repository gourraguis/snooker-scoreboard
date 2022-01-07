import { atom } from 'recoil';

export const selectedBallState = atom({
  key: 'lastBall',
  default: {
    color: '',
    val: 0,
  },
});
