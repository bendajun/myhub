export const enum LoginRegister {
  NAME_OR_PASSWORD_IS_REQUIRED = 'name_or_password_is_required',
  USER_ALREADY_EXISTS = 'user_already_exists',
  USER_NOT_EXISTS = 'user_not_exists',
  PASSWORD_IS_WRONG = 'password_is_wrong',
  UNAUTHORIZATION = 'unauthorization'
}

// token有效时间
export const TOKEN_TIME = 60 * 60 * 24