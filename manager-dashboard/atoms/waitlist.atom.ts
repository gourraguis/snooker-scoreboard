import { atom } from 'recoil'

export const waitlistState = atom<string[]>({
  key: 'waitlistState',
  default: [],
})
