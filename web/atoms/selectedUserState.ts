import { atom } from 'recoil';

export const selectedUserState = atom({
  key: 'user',
  default: {
    selectedUser: undefined,
  },
});

export const user1PointState = atom({
  key: 'points1',
  default: {
    score: 0,
  },
});

export const user2PointState = atom({
  key: 'points2',
  default: {
    score: 0,
  },
});
