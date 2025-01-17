export enum ERROR_MESSAGES {
  INVALID_UUID = 'The provided ID is not a valid UUID',
  NON_EXISTENT_ENTITY = 'The entity with the provided ID does not exist.',
  MISSING_REQUIRED_DATA = 'The request has missing required data.',
  WRONG_PASSWORD = 'Wrong old password was provided.',
  AUTH_FAILED = 'Authenticaion failed: wrong password or user with the provided login does not exist',
}
