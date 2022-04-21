export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const formattedPhone = phoneNumber.replace(/\D/g, '').replace(/^212/, '0')
  const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  if (formattedPhone && !phoneRegex.test(formattedPhone)) {
    return false
  }
  return true
}
