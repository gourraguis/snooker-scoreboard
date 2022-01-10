import { atom } from 'recoil';

export const selectedBallState = atom({
  key: 'lastBall',
  default: {
    id: 0,
    color: '',
    value: 0,
  },
});

export const scoreState = atom({
  key: 'score',
  default: {
    value: 0,
  },
});
