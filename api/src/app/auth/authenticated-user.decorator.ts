import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const AuthenticatedUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()

  const { user } = request
  console.log(user)

  return data ? user[data] : user
})
