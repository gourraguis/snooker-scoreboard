import * as dotenv from 'dotenv'

dotenv.config()
export const jwtConstants = {
  //Todo move to .env
  secret: process.env.JWT_SECRET,
}
