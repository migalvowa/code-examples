import React, { ElementType } from 'react'

import { ButtonProps, Button as MUIButton } from '@material-ui/core'

type ButtonType = <T extends ElementType>(props: ButtonProps<T>) => JSX.Element

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref
) {
  const { color = 'primary', ...rest } = props
  return <MUIButton {...rest} color={color} ref={ref} />
})

export default Button as ButtonType
