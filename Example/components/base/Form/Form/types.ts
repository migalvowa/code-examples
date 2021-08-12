import {
  FieldInputProps,
  FormikConfig,
  FormikErrors,
  FormikProps,
} from 'formik'
import { Schema } from 'yup'

interface FormControlsProps<T> {
  btnSubmitText?: string
  btnCancelText?: string
  showControls?: boolean
  onCancel?: (params: { dirty: boolean }) => void
  onSubmit?: FormikConfig<T>['onSubmit']
}

export type FormProps<T> = Omit<FormikConfig<T>, 'component' | 'render'> &
  FormControlsProps<T> & {
    // Force schema to be an object.
    // Drop Formik option to define schema as function, because it's not clear for what such option exists at all.
    // @see https://github.com/formium/formik/blob/d51a323f41df7d172b5615af04dc11fdd8d5adea/packages/formik/src/Formik.tsx#L222-L223
    //
    // TODO:
    //  Use `any` instead of `T` here, because it's quite hard
    //  to sync TS interface definition with yup validator types.
    //  Ideally, we *should* do this – so schema is guaranteed to match entity
    //  – but it takes way too much time.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validationSchema?: Schema<any>
    errors?: FormikErrors<T>
  }

export type FieldRenderProps<Field = unknown, Form = unknown> = {
  form: FormikProps<Form>
  field: FieldInputProps<Field>
}
