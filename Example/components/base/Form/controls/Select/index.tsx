import React from "react";

import { TextField, Typography } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

import clsx from "clsx";
import { intersectionWith, isPlainObject } from "lodash";

import { useCoreTranslation } from "@core/core/core";
import { useChanged } from "@core/core/hooks";
import { ISelectOption } from "@core/core/types";

import { FieldRenderProps } from "../../Form/types";
import { getFormikFieldError } from "../../lib";
import FieldLabel from "../FieldLabel";
import FormControl from "../FormControl";

import { useStyles } from "./styles";
import {
  IFormSelectProps,
  IFormSelectValue,
  ISelectFieldItemProps,
} from "./types";

// ---

const MenuItemLayout: React.FC = ({ children }) => (
  <Typography component="span" color="textPrimary" variant="body2" noWrap>
    {children}
  </Typography>
);

function DefaultMenuItem<OptionType>(props: ISelectFieldItemProps<OptionType>) {
  const { option, getOptionLabel } = props;
  return <MenuItemLayout>{getOptionLabel(option)}</MenuItemLayout>;
}

// ---

export default function FormSelect<
  OptionType extends ISelectOption | string | number = ISelectOption,
  Multiple extends boolean = false,
  Clearable extends boolean = false,
  FreeSolo extends boolean = false,
  ValueType = OptionType
>(
  props: IFormSelectProps<
    OptionType,
    Multiple,
    Clearable,
    FreeSolo,
    ValueType
  > &
    FieldRenderProps
) {
  const {
    // By default we have `ValueType = OptionType`,
    // so returning by default option as-is is valid
    getOptionValue = ((option: unknown) => option) as NonNullable<
      typeof props["getOptionValue"]
    >,
    getOptionLabel = (option) =>
      isPlainObject(option) ? (option as ISelectOption).title : `${option}`,
    options,
    variant = "filled",
    label,
    form,
    field,
    clearable = false,
    multiple = false,
    freeSolo = false,
    asAutocomplete = false,
    MenuItem = DefaultMenuItem,
    onChange,
    helperText,
    className,
    onInputChange,
    required,
    ...rest
  } = props;

  const { t } = useCoreTranslation();
  const classes = useStyles();

  const { errorText, hasError } = getFormikFieldError({ form, field });

  // ---

  type MUIAutocompleteValue = OptionType | OptionType[] | null;
  type COREAutocompleteValue = IFormSelectValue<
    Multiple,
    Clearable,
    FreeSolo,
    ValueType
  >;

  function getOptionSelected<T = OptionType>(option: T, value: T) {
    if (isPlainObject(option) && isPlainObject(value) && value !== null) {
      return (option as Dict).id === (value as Dict).id;
    }
    return option === value;
  }

  function composeAutocompleteValue(
    value: COREAutocompleteValue
  ): MUIAutocompleteValue {
    if (multiple) {
      return intersectionWith(options, value as ValueType[], (option, value) =>
        getOptionSelected(getOptionValue(option), value)
      );
    }

    const selectedOption = options.find((option) =>
      getOptionSelected(getOptionValue(option), value as ValueType)
    );
    return selectedOption ?? null;
  }

  function composeChangedValue(
    value: MUIAutocompleteValue
  ): COREAutocompleteValue {
    if (value === null) {
      return null as COREAutocompleteValue;
    }

    if (Array.isArray(value)) {
      return value.map((v) => getOptionValue(v)) as COREAutocompleteValue;
    }

    return getOptionValue(value) as COREAutocompleteValue;
  }

  function getInputValue(value: COREAutocompleteValue) {
    if (!freeSolo) {
      // In non-editable select, leave input uncontrolled.
      // It will serve for search only.
      return undefined;
    }

    // In editable select, input value MUST be defined, to keep it controlled,
    // making sure input contains the same value as is in form state.
    const empty = "";

    if (value === null) {
      return empty;
    }

    // Use option label as input value, same as it done internally:
    // @see https://github.com/mui-org/material-ui/blob/3d0efb16603096c87fe8d68182a3857985df9f51/packages/material-ui/src/useAutocomplete/useAutocomplete.js#L155
    return getOptionLabel(field.value as OptionType) ?? empty;
  }

  function setFieldTouched(shouldValidate?: boolean) {
    const { touched } = form.getFieldMeta(field.name);
    if (!touched) {
      form.setFieldTouched(field.name, true, shouldValidate);
    }
  }

  // ---

  return (
    <FormControl
      error={hasError}
      errorText={errorText}
      helperText={helperText}
      className={className}
    >
      <Autocomplete<OptionType, boolean, boolean, boolean>
        {...field}
        {...rest}
        // Must use `useChanged` here for multi-select.
        // Autocomplete resets search input value to empty string whenever select value changes:
        // @see https://github.com/mui-org/material-ui/blob/3d0efb16603096c87fe8d68182a3857985df9f51/packages/material-ui/src/useAutocomplete/useAutocomplete.js#L170
        // Multi-select value is an array, so without memoizing it always considered changed,
        // which means you can't type search value.
        value={useChanged(
          composeAutocompleteValue(field.value as COREAutocompleteValue)
        )}
        options={options}
        multiple={multiple}
        freeSolo={freeSolo}
        classes={{
          paper: classes.paper,
          listbox: classes.listbox,
          option: classes.option,
          inputRoot: classes.inputRoot,
          input: classes.input,
        }}
        noOptionsText={t("No options")}
        onChange={(e, value, reason): void => {
          const composedValue = composeChangedValue(value as OptionType);
          // assume that by passing `onChange` we want to fully customize field behavior
          // not just "subscribe on changes"
          onChange
            ? onChange(composedValue, reason)
            : form.setFieldValue(field.name, composedValue);
        }}
        // Make autocomplete-select behave same as normal inputs - get "touched" whenever you type
        onInputChange={(e, value, reason) => {
          // Only run validation if creating new items is allowed –
          // i.e. when input value can actually affect form values.
          // For regular autocomplete, input value isn't related to form values at all.
          // 'reset' reason - isn't user interaction, no need to set field touched
          if (reason !== "reset") {
            setFieldTouched(freeSolo);
          }
          onInputChange && onInputChange(e, value, reason);
        }}
        // Replace `onBlur` callback provided by `field` spread.
        // Have to do it manually, because in autocomplete mode, it's passed to input element,
        // which has another name then select itself (as obviously two elements with same name can't exist in form) –
        // which means, `touched` state will be set for some unexisting field.
        onBlur={() => {
          // Here run validation as default – doesn't matter is it `freeSolo` or simple autocomplete.
          // It also mimics behavior of normal text inputs –
          // "if it get blurred, you're done with it, and value is ready to be validated"
          setFieldTouched();
        }}
        disableClearable={!clearable}
        getOptionLabel={getOptionLabel}
        getOptionSelected={getOptionSelected}
        getOptionDisabled={(option) =>
          isPlainObject(option) ? Boolean((option as Dict).disabled) : false
        }
        renderOption={(option) => (
          <MenuItem option={option} getOptionLabel={getOptionLabel} />
        )}
        inputValue={getInputValue(field.value as COREAutocompleteValue)}
        filterOptions={(options, params) => {
          const filtered = createFilterOptions<OptionType>()(options, params);
          // Suggest the creation of a new value
          if (freeSolo && params.inputValue !== "") {
            filtered.unshift({
              title: `Create option «${params.inputValue}»`,
              disabled: true,
            } as OptionType);
          }
          return filtered;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={<FieldLabel>{label}</FieldLabel>}
            variant={variant}
            error={hasError}
            InputLabelProps={{
              required,
              classes: { root: classes.label },
            }}
            InputProps={{
              ...params.InputProps,
              className: clsx(params.InputProps.className, {
                // remove outlined notch, when empty label
                [classes.notchedOutline]: variant === "outlined" && !label,
              }),
            }}
            inputProps={{
              ...params.inputProps,
              readOnly: !asAutocomplete,
              // disable autocomplete and autofill
              // @see https://material-ui.com/ru/components/autocomplete/#autocomplete-autofill
              autoComplete: "new-password",
            }}
          />
        )}
      />
    </FormControl>
  );
}
