import React, { ReactNode } from 'react'

import { TextField, TextFieldProps, makeStyles } from '@material-ui/core'

import { FieldRenderProps } from '../Form/types'
import { getFormikFieldError } from '../lib'

import FieldLabel from './FieldLabel'
import FormControl from './FormControl'

export const useStyles = makeStyles(() => ({
  label: {
    maxWidth: 'calc(100% - 24px)',
    display: 'flex',
    whiteSpace: 'nowrap',
  },
}))

type IFormTextInputProps = TextFieldProps & {
  shrink?: boolean
  helperText?: ReactNode
}

export default function FormTextInput(
  props: IFormTextInputProps & FieldRenderProps<string>
) {
  const {
    form,
    field,
    variant = 'filled',
    className,
    shrink,
    InputProps,
    helperText,
    label,
    required,
    ...rest
  } = props
  const classes = useStyles()
  const { errorText, hasError } = getFormikFieldError({ form, field })

  return (
    <FormControl
      error={hasError}
      errorText={errorText}
      helperText={helperText}
      className={className}
    >
      <TextField
        {...field}
        {...rest}
        variant={variant}
        InputProps={InputProps}
        InputLabelProps={{ shrink, required, classes: { root: classes.label } }}
        label={<FieldLabel>{label}</FieldLabel>}
        error={hasError}
      />
    </FormControl>
  )
}
