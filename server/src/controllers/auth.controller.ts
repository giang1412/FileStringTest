import { NextFunction, Request, Response } from 'express'
import { USERS_MESSAGES } from '~/constants/messages'
import {
  LoginReqBody,
  LogoutReqBody,
  RefreshTokenReqBody,
  RegisterReqBody,
  TokenPayload
} from '~/models/requests/User.requests'
import authService from '~/services/auth.services'
import { ParamsDictionary } from 'express-serve-static-core'
import User from '~/models/schemas/User.schema'
import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enums'

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  await authService.register(req.body)
  return res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS
  })
}

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId

  const result = await authService.login({
    user_id: user_id.toString(),
    verify: user.verify as UserVerifyStatus
  })

  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const refreshTokenController = async (
  req: Request<ParamsDictionary, any, RefreshTokenReqBody>,
  res: Response
) => {
  const { refresh_token } = req.body
  const { user_id, exp, roles, verify } = req.decoded_refresh_token as TokenPayload

  const result = await authService.refreshToken({ refresh_token, user_id, exp, roles, verify })
  return res.json({
    message: USERS_MESSAGES.REFRESH_TOKEN_SUCCESS,
    result
  })
}

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await authService.logout(refresh_token)
  return res.json(result)
}
