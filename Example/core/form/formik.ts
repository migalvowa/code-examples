import { FieldInputProps, FormikErrors, FormikProps } from 'formik'
import { isPlainObject } from 'lodash'

/**
 * Internal logic of formik's `ErrorMessage` components:
 * {@link https://github.com/formium/formik/blob/d51a323f41df7d172b5615af04dc11fdd8d5adea/packages/formik/src/ErrorMessage.tsx#L39}
 * extracted for using with MUI components.
 */
export function getFormikFieldError(params: {
  form: FormikProps<unknown>
  field: FieldInputProps<unknown>
}) {
  const { form, field } = params
  const { error, touched } = form.getFieldMeta(field.name)

  // Error is a string when field itself is validated,
  // and an array/object when it's nested fields are validated (if any).
  // In context of particular form inputs, we're only interested in field's *own* error.
  const isFieldOwnError = typeof error === 'string'

  return {
    hasError: isFieldOwnError && touched,
    errorText: isFieldOwnError ? error : undefined,
  }
}

/**
 * @see https://github.com/formium/formik/blob/d51a323f41df7d172b5615af04dc11fdd8d5adea/packages/formik/src/types.tsx#L10
 */
export function isFormikErrors<T>(x: unknown): x is FormikErrors<T> {
  return isPlainObject(x)
}

/**
 * This is workaround for dumb bug in Formik's logic.
 *
 * Here's how `isValid` prop is computed:
 * {@link https://github.com/formium/formik/blob/7fdd51489c6f5a52c415ac345f24bd1c9ff3361b/packages/formik/src/Formik.tsx#L940}
 * Attention at `Object.keys(state.errors).length === 0`.
 *
 * When using `FieldArray` helpers like `move` or `swap`, array field gets validated:
 * {@link https://github.com/formium/formik/blob/7fdd51489c6f5a52c415ac345f24bd1c9ff3361b/packages/formik/src/FieldArray.tsx#L225}
 * {@link https://github.com/formium/formik/blob/7fdd51489c6f5a52c415ac345f24bd1c9ff3361b/packages/formik/src/FieldArray.tsx#L176}
 * which results in array of that field validation results in formik state.
 *
 * I.e., even if everything is valid, the `formik.errors` state will look
 * like `{ fieldName: [ undefined, undefined, undefined ] }` – which IS considered INVALID state.
 * Also, depending on array helper used, results may be either undefined or null, like here:
 * {@link https://github.com/formium/formik/blob/7fdd51489c6f5a52c415ac345f24bd1c9ff3361b/packages/formik/src/FieldArray.tsx#L232}
 *
 * Why don't we use final-form, again?
 * Here is how final-form checks validity:
 * {@link https://github.com/final-form/final-form/blob/master/src/FinalForm.js#L563}
 */
export function isFormikValid<T>(form: FormikProps<T>) {
  if (form.isValid) {
    return true
  }
  const { errors } = form
  if (!errors) {
    return true
  }

  if (Object.keys(errors).length === 0) {
    return true
  }

  return !hasAnyError(errors)
}

/**
 * Copied from final-form:
 * {@link https://github.com/final-form/final-form/blob/9c732e27f29e82ea55b7c0f8a6cafb208c96ccb9/src/FinalForm.js#L65-L75}
 * with addition of checking for `null` values, accordingly to explanation above.
 */
function hasAnyError(errors: Dict): boolean {
  return Object.keys(errors).some(key => {
    const value = errors[key]

    if (value && typeof value === 'object' && !(value instanceof Error)) {
      return hasAnyError(value as Dict)
    }

    return typeof value !== 'undefined' && value !== null
  })
}
