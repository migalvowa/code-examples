import * as yup from 'yup'

import { ValidationWordings } from '../wordings'

export function withNumbersRange(wordings: ValidationWordings) {
  return (schema: yup.NumberSchema, range: { min: number; max: number }) => {
    const wording = wordings.number.range(range)
    return schema.min(range.min, wording).max(range.max, wording)
  }
}
