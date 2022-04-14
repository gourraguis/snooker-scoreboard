import { atom } from 'recoil'

export const waitListState = atom<string[]>({
  key: 'waitListState',
  default: [],
})
