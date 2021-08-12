import React from "react";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog as MUIDialog,
  Typography,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import { noop } from "lodash";

import { useCoreTranslation } from "@core/core/core";

import { useStyles } from "./styles";
import { IDialogProps } from "./types";

export default function Dialog(props: IDialogProps) {
  const { t } = useCoreTranslation();
  const {
    onConfirm = noop,
    onClose = noop,
    cancelButtonTitle = t("Cancel"),
    submitButtonTitle = t("Confirm"),
    open = false,
    showControls = true,
    title,
    subtitle,
    children,
    classes = {},
    ...rest
  } = props;

  const styles = useStyles();

  return (
    <MUIDialog
      {...rest}
      onClose={onClose}
      aria-labelledby="dialog-title"
      open={open}
      classes={classes.root}
    >
      <DialogTitle disableTypography>
        <Typography variant="h2" component="span">
          {title}
        </Typography>

        <IconButton aria-label="close" color="secondary" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent classes={classes.content}>
        {subtitle && (
          <Typography
            variant="body1"
            component="div"
            className={styles.subtitle}
          >
            {subtitle}
          </Typography>
        )}

        {children}
      </DialogContent>

      {showControls && (
        <DialogActions classes={classes.actions}>
          <Button variant="outlined" color="primary" onClick={onClose}>
            {cancelButtonTitle}
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            {submitButtonTitle}
          </Button>
        </DialogActions>
      )}
    </MUIDialog>
  );
}
