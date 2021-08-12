import { ComponentType, ReactNode } from "react";

import { FormControlProps } from "@material-ui/core";
import { AutocompleteChangeReason, AutocompleteProps } from "@material-ui/lab";

import { ISelectOption } from "@core/core/types";

export interface ISelectFieldItemProps<OptionType> {
  option: OptionType;
  getOptionLabel: (option: OptionType) => ReactNode;
}

export type IFormSelectValue<Multiple, Clearable, FreeSolo, ValueType> =
  Multiple extends true
    ? ValueType[]
    : Clearable extends false
    ? ValueType
    : FreeSolo extends false
    ? ValueType
    : ValueType | null;

export interface IFormSelectProps<
  OptionType extends ISelectOption | string | number = ISelectOption,
  Multiple extends boolean | undefined = false,
  Clearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ValueType = OptionType
> extends Pick<
    AutocompleteProps<OptionType, Multiple, Clearable, FreeSolo>,
    | "disabled"
    | "getOptionLabel"
    | "multiple"
    | "options"
    | "size"
    | "onInputChange"
    | "className"
  > {
  getOptionValue?: (option: OptionType) => ValueType;
  clearable?: boolean;
  label?: string;
  variant?: FormControlProps["variant"];
  MenuItem?: ComponentType<ISelectFieldItemProps<OptionType>>;
  onChange?: (
    value: IFormSelectValue<Multiple, Clearable, FreeSolo, ValueType>,
    reason: AutocompleteChangeReason
  ) => void;
  asAutocomplete?: boolean;
  freeSolo?: boolean;
  helperText?: ReactNode;
  required?: boolean;
}
