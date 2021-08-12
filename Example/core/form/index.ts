import { createFormUnknownError } from './formUnknownError'
import { isFormikErrors } from './formik'

export * from './formUnknownError'
export * from './formik'

export function composeFormErrors<T>(x: unknown) {
  if (x === undefined || x === null) {
    return undefined
  }
  if (isFormikErrors<T>(x)) {
    return x
  }
  return createFormUnknownError(x)
}
