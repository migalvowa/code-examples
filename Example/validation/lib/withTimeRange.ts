import moment from "moment";
import * as yup from "yup";

import { TIME_FORMAT } from "@core/core/const";
import { isValidDate } from "@core/core/utils";

import { ValidationWordings } from "../wordings";

interface Options {
  startFieldError?: string;
  endFieldError?: string;
  nullable?: boolean;
}

type FieldValue = string | null | undefined;

const toTime = (x: string) => moment(x, TIME_FORMAT);

const isValidRange = (startTime: FieldValue, endTime: FieldValue) => {
  // unless both fields specified, there is no range to validate
  if (startTime == null || endTime == null) {
    return true;
  }
  return toTime(endTime).isSameOrAfter(toTime(startTime));
};

export function withTimeRange(wordings: ValidationWordings) {
  return (
    schema: yup.ObjectSchema,
    names: [string, string],
    options?: Options
  ) => {
    const [startFieldName, endFieldName] = names;

    // ---

    const {
      nullable = true,
      startFieldError = wordings.time.rangeStartInvalid,
      endFieldError = wordings.time.rangeEndInvalid,
    } = options ?? {};

    const timeField = () =>
      yup
        .string()
        .nullable(nullable)
        .required(wordings.required)
        .test("time", wordings.incorrect, (time) =>
          isValidDate(time as string, TIME_FORMAT)
        );

    const timeRangeField = (options: {
      pair: string;
      rangeError: string;
      isStart: boolean;
    }) =>
      timeField().when(
        options.pair,
        (pair: FieldValue, schema: yup.StringSchema) =>
          schema.test("time-range", options.rangeError, (value) =>
            options.isStart
              ? isValidRange(value, pair)
              : isValidRange(pair, value)
          )
      );

    // ---

    return schema.shape(
      {
        [startFieldName]: timeRangeField({
          pair: endFieldName,
          rangeError: startFieldError,
          isStart: true,
        }),

        [endFieldName]: timeRangeField({
          pair: startFieldName,
          rangeError: endFieldError,
          isStart: false,
        }),
      },
      [[startFieldName, endFieldName]]
    );
  };
}
