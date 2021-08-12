import { Ref } from 'react'

import { TextFieldProps } from '@material-ui/core'

import { EditorState } from 'draft-js'
import { TMUIRichTextEditorProps } from 'mui-rte'

import { FieldRenderProps } from '../../Form/types'

export type RichTextEditorState = {
  defaultValue: string
  editorContent: string
  setEditorState: (state: EditorState) => void
}

export type RichTextInputProps = Omit<
  TMUIRichTextEditorProps,
  'onChange' | 'onFocus' | 'onBlur'
> & {
  inputRef?: Ref<unknown>
  isActive?: boolean
  isFocused?: boolean
  onContentChange?: (value: string) => void
}

export type IFormRichTextInputProps = Omit<TextFieldProps, 'InputProps'> &
  FieldRenderProps & {
    RichTextInputProps: RichTextInputProps
  }
