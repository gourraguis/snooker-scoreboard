import { atom } from 'recoil'

export const authState = atom({
  key: 'auth',
  default: false,
})

export const otpModalState = atom({
  key: 'otpModalState',
  default: false,
})
