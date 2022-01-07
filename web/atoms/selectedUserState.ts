import { atom } from 'recoil';

export const selectedUserState = atom({
  key: 'user',
  default: {
    selectedUser: undefined,
  },
});
