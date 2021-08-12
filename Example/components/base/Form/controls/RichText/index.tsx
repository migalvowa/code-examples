import React, {
  MouseEvent,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { TextField } from "@material-ui/core";

import { noop } from "lodash";
import MUIRichTextEditor, { TMUIRichTextEditorRef } from "mui-rte";

import { useOnChange } from "@core/core/hooks";

import { getFormikFieldError } from "../../lib";
import FormControl from "../FormControl";

import { useRichTextEditorState } from "./lib";
import { useStyles } from "./styles";
import { IFormRichTextInputProps, RichTextInputProps } from "./types";

const DEFAULT_TOOLBAR_CONTROLS = [
  "title",
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "highlight",
  "undo",
  "redo",
  "link",
  "bulletList",
  "numberList",
  "clear",
];

const RichTextInput = (props: RichTextInputProps) => {
  const {
    inputRef,
    defaultValue,
    isFocused,
    controls,
    onContentChange = noop as NonNullable<
      RichTextInputProps["onContentChange"]
    >,
    ...rest
  } = props;

  const classes = useStyles();

  const richTextRef = useRef<TMUIRichTextEditorRef>(null);

  const focusRichText = useCallback(
    () => richTextRef.current?.focus(),
    [richTextRef]
  );

  useImperativeHandle(inputRef, () => ({ focus: focusRichText }));

  const {
    defaultValue: editorDefaultValue,
    editorContent,
    setEditorState,
  } = useRichTextEditorState(defaultValue);

  useOnChange(editorContent, (editorContent) => onContentChange(editorContent));

  return (
    <MUIRichTextEditor
      {...rest}
      classes={{
        root: classes.root,
        toolbar: classes.toolbar,
      }}
      defaultValue={editorDefaultValue}
      ref={richTextRef}
      controls={controls ?? DEFAULT_TOOLBAR_CONTROLS}
      onChange={setEditorState}
    />
  );
};

export default function FormRichTextInput(props: IFormRichTextInputProps) {
  const {
    form,
    variant = "filled",
    field,
    InputLabelProps,
    RichTextInputProps,
    id,
    helperText,
    ...rest
  } = props;
  const classes = useStyles();
  const { errorText, hasError } = getFormikFieldError({ form, field });
  // Manually handle the TextField's focused state based on the editor's focused state
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TMUIRichTextEditorRef>();
  const inputProps: RichTextInputProps = {
    ...RichTextInputProps,
    id: id ?? field.name,
    defaultValue: field.value,
    inputRef,
    isFocused,
    onContentChange: useCallback(
      (value: string) => {
        form.setFieldValue(field.name, value);
      },
      [field.name, form]
    ),
  };

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.id.includes(inputProps.id as string)) {
        inputRef.current?.focus();
      }
    },
    [inputProps.id]
  );

  return (
    <FormControl error={hasError} errorText={errorText} helperText={helperText}>
      <TextField
        {...rest}
        id={id}
        variant={variant}
        error={hasError}
        focused={isFocused}
        onClickCapture={handleClick}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        InputLabelProps={{ ...InputLabelProps, shrink: true }}
        InputProps={{
          inputComponent: RichTextInput,
          inputProps,
          className: classes.richTextField,
        }}
      />
    </FormControl>
  );
}
