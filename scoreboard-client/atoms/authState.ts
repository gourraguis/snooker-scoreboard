import { atom } from 'recoil';

const token = localStorage.getItem('token');

export const authState = atom({
  key: 'auth',
  default: {
    id: token !== undefined,
  },
});
