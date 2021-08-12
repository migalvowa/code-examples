import { TextFieldProps } from '@material-ui/core'
import { KeyboardTimePickerProps } from '@material-ui/pickers/TimePicker'

import { ClassDictionary, ClassValue } from 'clsx'

import { FieldRenderProps } from '../../Form/types'

export interface IFormTimePickerProps extends FieldRenderProps<string> {
  label: string
  disabled?: boolean
  inputVariant?: KeyboardTimePickerProps['inputVariant']
  className?: ClassValue
  variant?: string
  required?: boolean
  size?: TextFieldProps['size']
}

declare module '@material-ui/pickers/TimePicker/TimePicker' {
  interface BaseTimePickerProps {
    classes: ClassDictionary
  }
}
