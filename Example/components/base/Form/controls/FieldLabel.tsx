import React, { ReactNode } from 'react'

import { makeStyles } from '@material-ui/core'

interface IFieldLabelProps {
  children: ReactNode
}

export const useStyles = makeStyles(() => ({
  label: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))

export default function FieldLabel(props: IFieldLabelProps) {
  const classes = useStyles()
  const { children } = props

  return <span className={classes.label}>{children}</span>
}
