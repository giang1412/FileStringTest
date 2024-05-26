export const ROLE = {
  ADMIN: 'admin',
  USER: 'user'
}

export enum TokenType {
  AccessToken,
  RefreshToken
}

export enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa
}
