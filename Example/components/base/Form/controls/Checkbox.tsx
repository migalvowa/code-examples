import React, { ReactNode } from 'react'

import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
  Switch,
  Theme,
  makeStyles,
} from '@material-ui/core'

import { FieldRenderProps } from '../Form/types'
import { getFormikFieldError } from '../lib'

import FormControl from './FormControl'

export type IFormCheckboxProps = Omit<CheckboxProps, 'form'> & {
  label?: FormControlLabelProps['label']
  asSwitch?: boolean
  helperText?: ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'flex-start',
  },
  label: {
    wordBreak: 'break-word',
    paddingTop: theme.spacing(2),
  },
}))

export default function FormCheckbox(
  props: IFormCheckboxProps & FieldRenderProps<boolean>
) {
  const classes = useStyles()

  const {
    form,
    field,
    label,
    asSwitch = false,
    color = 'primary',
    className,
    helperText,
    ...rest
  } = props
  const { errorText, hasError } = getFormikFieldError({ form, field })

  return (
    <FormControl
      error={hasError}
      errorText={errorText}
      helperText={helperText}
      gap={false}
    >
      <FormControlLabel
        label={label}
        classes={{ label: classes.label, root: classes.root }}
        control={
          asSwitch ? (
            <Switch {...field} {...rest} color={color} className={className} />
          ) : (
            <Checkbox
              {...field}
              {...rest}
              color={color}
              className={className}
            />
          )
        }
      />
    </FormControl>
  )
}
