import { useCallback } from 'react'

import { noop } from 'lodash'

import { useCheckbox } from './util'

// ---

type Callback<T> = T extends Func ? AsCallback<T> : () => void

interface IOptions {
  onOpen?: Func
  onCancel?: Func
  onConfirm?: Func
  onClose?: () => void
}

interface IConfirmationDialog<T extends IOptions> {
  isOpen: boolean
  open: Callback<T['onOpen']>
  confirm: Callback<T['onConfirm']>
  cancel: Callback<T['onCancel']>
}

// ---

export default function useConfirmationDialog<T extends IOptions>(
  options: T = {} as T
): IConfirmationDialog<T> {
  const { checked: isOpen, check: open, uncheck: close } = useCheckbox(false)
  const {
    onOpen = noop,
    onCancel = noop,
    onConfirm = noop,
    onClose = noop,
  } = options

  return {
    isOpen,

    open: useCallback(
      (...args: unknown[]) => {
        onOpen(...args)
        open()
      },
      [open, onOpen]
    ) as Callback<T['onOpen']>,

    cancel: useCallback(
      (...args: unknown[]) => {
        onCancel(...args)
        onClose()
        close()
      },
      [close, onCancel, onClose]
    ) as Callback<T['onCancel']>,

    confirm: useCallback(
      (...args: unknown[]) => {
        onConfirm(...args)
        onClose()
        close()
      },
      [close, onClose, onConfirm]
    ) as Callback<T['onConfirm']>,
  }
}
