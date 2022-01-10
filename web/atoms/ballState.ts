import { atom } from 'recoil';

export const ballsState = atom({
  key: 'ball',
  default: {
    id: 0,
    color: '',
    value: 0,
    score: 0,
  },
});
