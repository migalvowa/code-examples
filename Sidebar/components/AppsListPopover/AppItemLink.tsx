import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Box, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import useStyles from './styles'
import { ISidebarAppItemLinkProps } from './types'

export const SidebarAppItemLink = (props: ISidebarAppItemLinkProps) => {
  const { label, link, icon, msRoute } = props
  const classes = useStyles()
  const history = useHistory()

  const handleClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (msRoute) {
      window.location.href = link
    } else {
      history.push(link)
    }
  }

  return (
    <ListItem
      classes={{
        root: classes.appContainer,
      }}
      component={NavLink}
      to={link}
      onClick={handleClickLink}
      id={`sidebar_${link.split('/')[1]}_open`}
    >
      <Box className={classes.appIcon}>
        <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
      </Box>

      <ListItemText
        classes={{
          root: classes.appTitle,
          primary: classes.appTitleText,
        }}
        primary={label}
      />
    </ListItem>
  )
}
