import React from 'react'

import clsx from 'clsx'

import { useStyles } from './styles'
import { IGridProps } from './types'

const Grid = (props: IGridProps) => {
  const {
    columns = 1,
    children,
    inline = false,
    gutterBottom = false,
    gap = false,
  } = props
  const classes = useStyles({ columns, inline, gutterBottom })

  return (
    <div
      className={clsx(classes.root, {
        [classes.gutterBottom]: gutterBottom,
        [classes.gap]: gap,
      })}
    >
      {children}
    </div>
  )
}

export default Grid
