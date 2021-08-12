import { IDialogProps } from '../Dialog'
import { FormProps } from '../Form'

export interface IFormDialogProps<T>
  extends Omit<FormProps<T>, 'showControls' | 'onCancel'>,
    Pick<IDialogProps, 'open' | 'title' | 'subtitle' | 'classes'> {
  cancelDialogTitle?: string
  onCancel?: () => void // overridden. Skip callback params.
}
