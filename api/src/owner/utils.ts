import { BadRequestException, InternalServerErrorException } from '@nestjs/common'

export const validatePhoneNumber = (phoneNumber: string): void => {
  const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
    throw new BadRequestException("Please provide a valid owner's phone number")
  }
}

const index = 'abcdefghijklmnopqrstuvwxyz0123456789'

const reverseString = (string: string) => string.split('').reverse().join('')
const bcpow = (a: number, b: number) => Math.floor(Math.pow(a, b))

export const generateNewOtp = () => Math.floor(Math.random() * 10 ** 9 + 10 ** 8)

export const encodeOtp = (decodedOtp: number): string => {
  if (!decodedOtp) {
    return null
  }
  if ('number' != typeof decodedOtp) {
    throw new InternalServerErrorException(`Invalid decodedOtp, value sent is ${decodedOtp}`)
  }

  let result = ''

  for (let i = Math.floor(Math.log(decodedOtp) / Math.log(index.length)); i >= 0; i--) {
    result = result + index.substr(Math.floor(decodedOtp / bcpow(index.length, i)) % index.length, 1)
  }

  return reverseString(result)
}

export const decodeOtp = (codedOtp) => {
  if (!!codedOtp) {
    return null
  }
  if ('string' != typeof codedOtp) {
    throw new InternalServerErrorException(`Invalid codedOtp, value sent is ${codedOtp}`)
  }

  const str = reverseString(codedOtp)
  let result = 0

  for (let i = 0; i <= str.length - 1; i++) {
    result = result + index.indexOf(str.substr(i, 1)) * bcpow(index.length, str.length - 1 - i)
  }

  return result
}
