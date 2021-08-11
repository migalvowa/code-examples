import React from 'react'
import clsx from 'clsx'
import { Box, Typography } from '@material-ui/core'
import { ISidebarAppTitleProps } from './types'
import useStyles from './styles'

export const SidebarAppTitle = (props: ISidebarAppTitleProps) => {
  const {
    data: { label, icon },
  } = props
  const classes = useStyles()

  return (
    <Box className={classes.appTitle}>
      {icon && <Box className={classes.appIcon}>{icon}</Box>}

      <Typography
        className={clsx(classes.appTitleText, {
          [classes.appTitleTextWithoutIndent]: !icon,
        })}
        variant="body1"
        component="span"
        noWrap
      >
        {label}
      </Typography>
    </Box>
  )
}
