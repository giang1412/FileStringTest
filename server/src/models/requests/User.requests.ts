import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { ParamsDictionary } from 'express-serve-static-core'

export interface TokenPayload extends JwtPayload {
  user_id: string
  email: string
  token_type: TokenType
  verify: UserVerifyStatus
  exp: number
  iat: number
}

export interface RegisterReqBody {
  email: string
  password: string
  confirm_password: string
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface RefreshTokenReqBody {
  refresh_token: string
}

export interface LogoutReqBody {
  refresh_token: string
}
