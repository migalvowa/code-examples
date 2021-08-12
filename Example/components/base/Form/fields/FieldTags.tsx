import React from "react";

import { Field, useFormikContext } from "formik";

import { ITitledEntity } from "@core/core/types";

import { FormSelect, IFormSelectProps } from "../index";

export interface IFieldTagsProps {
  name: string;
  label: string;
  options: ITitledEntity[];
  required?: boolean;
}

export default function FieldTags<T extends ITitledEntity = ITitledEntity>(
  props: IFieldTagsProps
) {
  const { name, label, options, required } = props;
  const { setFieldValue } = useFormikContext<T>();

  return (
    <Field
      name={name}
      component={FormSelect}
      options={options}
      label={label}
      required={required}
      asAutocomplete
      freeSolo
      clearable
      onInputChange={
        ((e, title, reason) => {
          if (reason === "input" || reason === "clear") {
            setFieldValue(name, {
              title,
            });
          }
        }) as IFormSelectProps["onInputChange"]
      }
    />
  );
}
