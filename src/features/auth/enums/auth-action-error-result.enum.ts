export enum AuthActionErrorResultEnum {
  BAD_USER_CREDENTIALS = 'bad_user_credentials',
  USER_WITH_EMAIL_ALREADY_EXIST = 'user_with_email_already_exist',
  EMAIL_VERIFICATION = 'email_verification',
  RESET_PASSWORD_REQUEST = 'reset_password_request',
  RESET_PASSWORD = 'reset_password',
  SOMETHING_WENT_WRONG = 'something_went_wrong',
}
