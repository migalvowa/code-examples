import { ReactNode } from 'react'

import {
  DialogActionsProps,
  DialogContentProps,
  DialogProps,
} from '@material-ui/core'

export interface IDialogProps extends Omit<DialogProps, 'open' | 'classes'> {
  onConfirm?: () => void
  onClose?: () => void
  open?: boolean
  showControls?: boolean
  title?: string
  subtitle?: ReactNode
  submitButtonTitle?: string
  cancelButtonTitle?: string
  children?: ReactNode
  classes?: Partial<{
    root: DialogProps['classes']
    content: DialogContentProps['classes']
    actions: DialogActionsProps['classes']
  }>
}
