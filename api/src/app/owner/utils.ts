import { BadRequestException } from '@nestjs/common'

export const validatePhoneNumber = (phoneNumber: string): void => {
  const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
    throw new BadRequestException("Please provide a valid owner's phone number")
  }
}
