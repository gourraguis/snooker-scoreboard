export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  if (phoneNumber && !phoneRegex.test(phoneNumber)) {
    return false
  }
  return true
}
