import React from 'react'

import { Field } from 'formik'

import FormCheckbox, { IFormCheckboxProps } from '../controls/Checkbox'

export interface IFieldSwitchProps
  extends Omit<IFormCheckboxProps, 'asSwitch'> {
  name: string
}

export default function FieldSwitch(props: IFieldSwitchProps) {
  return <Field {...props} component={FormCheckbox} type="checkbox" asSwitch />
}
