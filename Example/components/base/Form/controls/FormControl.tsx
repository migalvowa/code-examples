import React, { ReactNode } from 'react'

import {
  FormControlProps,
  FormHelperText,
  FormControl as MUIFormControl,
  makeStyles,
} from '@material-ui/core'

import clsx from 'clsx'

interface IFormControlProps
  extends Pick<FormControlProps, 'error' | 'className' | 'children'> {
  errorText?: string
  helperText?: ReactNode
  gap?: boolean
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '0 !important',
  },
  helperText: {
    minHeight: 16,
    fontSize: 12,
    lineHeight: '16px',
    padding: '0 12px',
    marginTop: 0,
  },
}))

export default function FormControl(props: IFormControlProps) {
  const classes = useStyles()
  const {
    children,
    className,
    error,
    errorText,
    helperText,
    gap = true,
  } = props

  const showHelperText = gap || error || helperText

  return (
    <MUIFormControl
      margin="none"
      error={error}
      fullWidth
      className={clsx(classes.root, className)}
    >
      {children}
      {showHelperText && (
        <FormHelperText className={classes.helperText}>
          {error ? errorText : helperText}
        </FormHelperText>
      )}
    </MUIFormControl>
  )
}
