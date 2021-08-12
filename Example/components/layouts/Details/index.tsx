import React from 'react'

import { useStyles } from './styles'
import { IDetailsLayoutTypes } from './types'

function DetailsLayout(props: IDetailsLayoutTypes) {
  const { children, aside } = props
  const classes = useStyles({ aside })

  return (
    <div className={classes.root}>
      <div className={classes.children}>{children}</div>
      {aside && <div className={classes.children}>{aside}</div>}
    </div>
  )
}

export default DetailsLayout
