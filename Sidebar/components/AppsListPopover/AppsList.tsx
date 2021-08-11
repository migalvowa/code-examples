import React from 'react'
import { Box } from '@material-ui/core'
import { SidebarAppItemLink as AppItemLink } from './AppItemLink'
import { ISidebarAppsListProps } from './types'
import useStyles from './styles'

export const SidebarAppsList = ({ items, msRoute }: ISidebarAppsListProps) => {
  const classes = useStyles()

  return (
    <Box className={classes.appsList}>
      {items.map((item) => {
        return (
          <Box key={item.label} className={classes.app}>
            <AppItemLink {...item} msRoute={msRoute} />
          </Box>
        )
      })}
    </Box>
  )
}
