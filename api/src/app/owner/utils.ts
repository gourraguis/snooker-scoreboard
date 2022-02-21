import { BadRequestException } from '@nestjs/common'

export const validatePhoneNumber = (phoneNumber: string): void => {
  const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
    throw new BadRequestException("Please provide a valid owner's phone number")
  }
}

export const generateNewOtp = (): string => {
  const decodedOtp = Math.floor(Math.random() * 10 ** 9 + 10 ** 8)
  const index = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const bcpow = (a: number, b: number) => Math.floor(Math.pow(a, b))

  let result = ''
  for (let i = Math.floor(Math.log(decodedOtp) / Math.log(index.length)); i >= 0; i--) {
    result = result + index.substr(Math.floor(decodedOtp / bcpow(index.length, i)) % index.length, 1)
  }

  return result
}
