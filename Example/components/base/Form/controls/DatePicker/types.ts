import { ReactNode } from 'react'

import { TextFieldProps } from '@material-ui/core'
import { KeyboardDatePickerProps } from '@material-ui/pickers/DatePicker'

import { ClassDictionary } from 'clsx'

import { FieldRenderProps } from '../../Form/types'

export interface IFormDatePickerProps extends FieldRenderProps<string> {
  label: string
  disabled?: boolean
  inputVariant?: KeyboardDatePickerProps['inputVariant']
  className?: string
  variant?: string
  helperText?: ReactNode
  required?: boolean
  size?: TextFieldProps['size']
}

declare module '@material-ui/pickers/DatePicker/DatePicker' {
  interface BaseDatePickerProps {
    classes: ClassDictionary
  }
}
