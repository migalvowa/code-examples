import React, { memo, useCallback } from "react";

import { AccessTime as AccessTimeIcon } from "@material-ui/icons";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import DateFnsUtils from "@date-io/date-fns";
import clsx from "clsx";

import { useDiff } from "@core/core/hooks";

import { getFormikFieldError } from "../../lib";
import FieldLabel from "../FieldLabel";
import FormControl from "../FormControl";

import { dateToTime, timeToDate } from "./lib";
import { useStyles } from "./styles";
import { IFormTimePickerProps } from "./types";

function FormTimePicker(props: IFormTimePickerProps) {
  const {
    form,
    field,
    label,
    disabled,
    className,
    inputVariant = "filled",
    required,
    size,
  } = props;
  const classes = useStyles();
  const { errorText, hasError } = getFormikFieldError({ form, field });

  const handleChange = useCallback(
    (date: MaterialUiPickersDate | null, value?: string | null) => {
      const time = date ? dateToTime(date.toJSON()) : value;
      form.setFieldValue(field.name, time);
    },
    [field.name, form]
  );

  return (
    <FormControl
      error={hasError}
      errorText={errorText}
      className={clsx(classes.root, className)}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          keyboardIcon={<AccessTimeIcon />}
          autoOk
          disableToolbar
          ampm={false}
          openTo="hours"
          views={["hours", "minutes", "seconds"]}
          format="HH:mm:ss"
          mask="__:__:__"
          margin="none"
          autoComplete="off"
          label={<FieldLabel>{label}</FieldLabel>}
          error={hasError}
          disabled={disabled}
          inputVariant={inputVariant}
          variant="inline"
          helperText={null}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
          {...field}
          value={useDiff(field.value, (x) => (x !== "" ? timeToDate(x) : null))}
          onChange={handleChange}
          classes={{
            root: classes.timePicker,
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

export default memo(FormTimePicker);
