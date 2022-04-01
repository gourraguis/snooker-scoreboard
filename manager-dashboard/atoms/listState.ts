import { atom } from 'recoil'

export const listState = atom<string[]>({
  key: 'listState',
  default: [],
})
