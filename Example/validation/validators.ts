import { useMemo } from "react";

import V from "validator";
import * as yup from "yup";

import { MAX_NUMERIC_VALUE } from "@core/core/const";

import { numericString } from "./lib/numericString";
import { withNumbersRange } from "./lib/withNumbersRange";
import { withTimeRange } from "./lib/withTimeRange";
import { useValidationWordings } from "./wordings";

const STRING_MAX_LENGTH = 255;

export function useDefaultValidators() {
  const wordings = useValidationWordings();

  return useMemo(() => {
    const optionalString = yup
      .string()
      .trim()
      .max(STRING_MAX_LENGTH, wordings.string.max);
    const nonNegativeNumber = yup
      .number()
      .min(0, wordings.incorrect)
      .max(MAX_NUMERIC_VALUE, wordings.incorrect)
      .required(wordings.required);

    return {
      optionalString,

      requiredString: optionalString
        .max(STRING_MAX_LENGTH, wordings.string.minMax)
        .required(wordings.string.minMax),

      url: optionalString.test(
        "url",
        wordings.url,
        (x) =>
          // it's optional validator, so nullish values are valid
          x == null ||
          V.isURL(x, {
            protocols: ["http", "https"],
            allow_underscores: true,
            // By business-requirements: don't force to enter protocol, for user's convenience.
            require_protocol: false,
          })
      ),

      nonNegativeNumber,

      requiredIntegerNumber: yup
        .number()
        .integer(wordings.number.positiveInteger)
        .required(wordings.required),

      numericString: numericString(wordings),

      moneyFormat: nonNegativeNumber.test(
        "money-format",
        wordings.incorrect,
        (value) => /^\d+(\.\d{1,2})?$/.test(`${value}`)
      ),

      requiredEntity: yup
        .object()
        .shape({
          id: yup.string(),
          title: yup.string(),
        })
        .defined()
        .test("id", wordings.required, (value) => Boolean(value?.id)),

      withTimeRange: withTimeRange(wordings),
      withNumbersRange: withNumbersRange(wordings),
    };
  }, [wordings]);
}
