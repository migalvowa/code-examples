import React, { useRef } from "react";

import { Button } from "@material-ui/core";

import { Formik, Form as FormikForm, FormikProps } from "formik";
import { noop } from "lodash";

import { useCoreTranslation } from "@core/core/core";
import { useOnChange } from "@core/core/hooks";

import { isFormikValid } from "../lib";

import { useStyles } from "./styles";
import { FormProps } from "./types";

export default function Form<T>(props: FormProps<T>) {
  const { t } = useCoreTranslation();
  const {
    onSubmit = noop,
    onCancel,
    children,
    showControls = true,
    btnSubmitText = t("Submit"),
    btnCancelText = t("Cancel"),
    errors,
    ...rest
  } = props;
  const classes = useStyles();

  const formikRef = useRef<FormikProps<T>>(null);

  useOnChange(
    errors,
    (errors) => {
      const form = formikRef.current;
      if (form) {
        if (errors === undefined) {
          form.setErrors({});
        } else {
          form.setErrors(errors);
        }
        form.setSubmitting(false);
      }
    },
    {
      // Don't use shallow-equal for this.
      // Formik resets errors on submit, so even if server-side errors are exactly the same as before,
      // we still need to re-display them again.
      eq: (a, b) => a === b,
    }
  );

  return (
    <Formik {...rest} onSubmit={onSubmit} innerRef={formikRef}>
      {(formik) => (
        <FormikForm>
          {typeof children === "function" ? children(formik) : children}

          {showControls && (
            <div className={classes.formActions}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={
                  onCancel ? () => onCancel({ dirty: formik.dirty }) : undefined
                }
              >
                {btnCancelText}
              </Button>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={!formik.dirty || !isFormikValid(formik)}
              >
                {btnSubmitText}
              </Button>
            </div>
          )}
        </FormikForm>
      )}
    </Formik>
  );
}
