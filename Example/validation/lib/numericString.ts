import * as yup from "yup";

import { MAX_NUMERIC_VALUE } from "@core/core/const";

import { ValidationWordings } from "../wordings";

export function numericString(wordings: ValidationWordings) {
  return (
    yup
      .string()
      .trim()
      .ensure()
      // Technically, it should be `required` validator before all others.
      // But, being used with `input type=number`, validator will receive empty string
      // for any invalid value (like `3.` – it will be in input, but won't get to validator)
      // We should either do it like this, or use a full-functional masked input instead of native number input.
      .matches(
        // `minus` is not allowed – we have no need in negative numbers in entire system
        /^\d+(\.\d+)?$/,
        wordings.string.numeric
      )
      .test(
        "positive",
        wordings.number.positive,
        (value) => +(value as string) > 0
      )
      .test(
        "max",
        wordings.incorrect,
        (value) => +(value as string) <= MAX_NUMERIC_VALUE
      )
  );
}
