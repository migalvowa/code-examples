import React from "react";

import { ErrorMessage, useFormikContext } from "formik";

import { StatefulNotification } from "@core/core/components/base";

interface FormFlashErrorProps {
  name: string;
  submitOnly?: boolean;
}

export default function FormFlashError(props: FormFlashErrorProps) {
  const { name, submitOnly } = props;
  return (
    <ErrorMessage name={name}>
      {(message) => (
        <CustomFlashError message={message} submitOnly={submitOnly} />
      )}
    </ErrorMessage>
  );
}

interface FormCustomFlashErrorProps
  extends Pick<FormFlashErrorProps, "submitOnly"> {
  message: string | null | undefined;
}

export function CustomFlashError(props: FormCustomFlashErrorProps) {
  const { message, submitOnly = false } = props;
  const { submitCount } = useFormikContext();
  if (message === null || message === undefined) {
    return null;
  }
  return (
    <StatefulNotification
      resetOnChange={submitOnly ? submitCount : `${message}_${submitCount}`}
      message={message}
      variant="failed"
    />
  );
}
