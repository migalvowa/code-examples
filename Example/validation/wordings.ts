import { useMemo } from "react";

import { TFunction } from "i18next";

import { useCoreTranslation } from "@core/core/core";

function createWordings(t: TFunction) {
  return {
    required: t("The field is required"),
    incorrect: t("The value is incorrect"),
    string: {
      minMax: t("The field should contain 1—255 characters"),
      max: t("The field should contain max 255 characters"),
      numeric: t(
        "The field should be given in a numeric format, allowed characters 0-9, dots"
      ),
    },
    number: {
      positive: t("This field must be greater than 0"),
      positiveInteger: t("The value should be a positive integer number"),
      range: ({ min, max }: { min: number; max: number }) =>
        t("The value should be in a range from {{min}} to {{max}}", {
          min,
          max,
        }),
    },
    email: t("Email address is not valid"),
    url: t("Enter a correct URL"),
    time: {
      rangeStartInvalid: t("Start time should be before End time"),
      rangeEndInvalid: t("End time should be after Start time"),
    },
  };
}

export function useValidationWordings() {
  const { t } = useCoreTranslation();
  return useMemo(() => createWordings(t), [t]);
}

export type ValidationWordings = ReturnType<typeof createWordings>;
