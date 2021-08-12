import { FormikErrors } from 'formik'
import { isPlainObject } from 'lodash'

// This is what final-form has out of the box
// @see https://final-form.org/docs/final-form/api#form_error
// Why dont we use it instead of formik?
export const FORM_UNKNOWN_ERROR = '__unknown__' as const

export type FormUnknownError = { [FORM_UNKNOWN_ERROR]: string }
export type FormErrors<T> = FormikErrors<T> | FormUnknownError

export function isFormUnknownError(x: unknown): x is FormUnknownError {
  return isPlainObject(x) && FORM_UNKNOWN_ERROR in (x as Dict)
}

export function createFormUnknownError(e: unknown): FormUnknownError {
  return { [FORM_UNKNOWN_ERROR]: `${e}` } as FormUnknownError
}
