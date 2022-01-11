import { atom } from 'recoil';

export const lastBallsState = atom({
  key: 'ball',
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
