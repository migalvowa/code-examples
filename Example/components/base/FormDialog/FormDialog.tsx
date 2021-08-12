import React from "react";

import { Dialog, Form } from "@core/core/components/base";
import { useCoreTranslation } from "@core/core/core";
import { useCheckbox } from "@core/core/hooks";

import { IFormDialogProps } from "./types";

export default function FormDialog<T>(props: IFormDialogProps<T>) {
  const {
    children,
    open,
    cancelDialogTitle,
    title,
    subtitle,
    onCancel,
    classes,
    ...formProps
  } = props;

  const { t } = useCoreTranslation();

  const shouldConfirmCancel = cancelDialogTitle !== undefined;
  const {
    checked: isCanceling,
    check: setCancelMode,
    uncheck: setFormMode,
  } = useCheckbox();

  // As long as both dialogs have same `key` prop,
  // on mode change dialog element will be simply updated – rather than re-created entirely.
  // That is, it's equal to `<Dialog ...{isCanceling ? props1 : props2}>`.
  const DIALOG_EL_KEY = "dialog";

  const $form = (
    // render this extra div in both modes,
    // because dom structure must be equal to prevent re-creating form element on mode change
    <div
      role="form-dialog-wrapper"
      // Don't unmount form content when canceling, just hide it.
      // To don't loose components local state, if any.
      style={isCanceling ? { display: "none" } : undefined}
    >
      <Form
        {...formProps}
        showControls
        onCancel={({ dirty }) => {
          if (shouldConfirmCancel && dirty) {
            setCancelMode();
          } else if (onCancel) {
            onCancel();
          }
        }}
      >
        {children}
      </Form>
    </div>
  );

  if (isCanceling) {
    return (
      <Dialog
        key={DIALOG_EL_KEY}
        open={open}
        showControls
        title={cancelDialogTitle}
        subtitle={t(
          "Are you sure you want to cancel? All unsaved data will be lost"
        )}
        submitButtonTitle={t("Yes")}
        cancelButtonTitle={t("No")}
        onConfirm={onCancel}
        onClose={setFormMode}
        onExited={setFormMode}
      >
        {$form}
      </Dialog>
    );
  }

  return (
    <Dialog
      key={DIALOG_EL_KEY}
      open={open}
      showControls={false}
      title={title}
      subtitle={subtitle}
      classes={classes}
      onClose={shouldConfirmCancel ? setCancelMode : onCancel}
    >
      {$form}
    </Dialog>
  );
}
