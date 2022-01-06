import Cookies from 'js-cookie';
import { atom } from 'recoil';

const token = Cookies.get('token');

export const authState = atom({
  key: 'auth',
  default: {
    id: token !== undefined,
  },
});
