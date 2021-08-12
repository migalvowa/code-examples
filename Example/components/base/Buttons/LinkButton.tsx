import React from 'react'
import { Link } from 'react-router-dom'

import { ButtonProps } from '@material-ui/core'

import Button from './Button'

type ILinkButtonProps = Omit<ButtonProps<Link>, 'component' | 'href'>

export default React.forwardRef<HTMLLinkElement, ILinkButtonProps>(
  function LinkButton(props, ref) {
    return <Button {...props} component={Link} ref={ref} />
  }
)
