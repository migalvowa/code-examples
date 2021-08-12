import React, { memo, useCallback } from "react";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

import { createISOStringDate } from "@core/core/utils";

import { getFormikFieldError } from "../../lib";
import FieldLabel from "../FieldLabel";
import FormControl from "../FormControl";

import { useStyles } from "./styles";
import { IFormDatePickerProps } from "./types";

function FormDatePicker(props: IFormDatePickerProps) {
  const {
    form,
    field,
    label,
    disabled,
    className,
    inputVariant = "filled",
    helperText,
    required,
    size,
  } = props;
  const classes = useStyles();
  const { errorText, hasError } = getFormikFieldError({ form, field });

  const handleChange = useCallback(
    (date: MaterialUiPickersDate | null, value?: string | null) => {
      form.setFieldValue(
        field.name,
        moment(date).isValid() ? createISOStringDate(date) : value
      );
    },
    [field.name, form]
  );

  return (
    <FormControl
      error={hasError}
      errorText={errorText}
      className={className}
      helperText={helperText}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          disableToolbar
          format="dd.MM.yyyy"
          margin="none"
          autoComplete="off"
          label={<FieldLabel>{label}</FieldLabel>}
          disabled={disabled}
          inputVariant={inputVariant}
          variant="inline"
          error={hasError}
          invalidDateMessage={false}
          maxDateMessage={false}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          {...field}
          value={field.value ? field.value : null}
          onChange={handleChange}
          classes={{
            root: classes.datePicker,
          }}
          onClose={() => {
            // By default field is set touched on blur.
            // Datepicker can be changed via date selector, without focusing/blurring input.
            form.setFieldTouched(field.name, true);
          }}
          InputLabelProps={{
            required,
            classes: { root: classes.label },
          }}
          size={size}
        />
      </MuiPickersUtilsProvider>
    </FormControl>
  );
}

export default memo(FormDatePicker);
