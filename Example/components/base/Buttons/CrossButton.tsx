import React from 'react'

import { IconButton, IconButtonProps } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

export default React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function CrossButton(props, ref) {
    return (
      <IconButton {...props} size="small" ref={ref}>
        <CloseIcon />
      </IconButton>
    )
  }
)
