import { Router } from 'express'
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController
} from '~/controllers/auth.controller'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const authRouter = Router()

authRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

authRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

authRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

authRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

export default authRouter
