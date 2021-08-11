import React from 'react'
import { NavLink } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import clsx from 'clsx'
import useStyles from './styles'
import { ISidebarItemLinkProps } from './types'

export const SidebarItemLink = (props: ISidebarItemLinkProps) => {
  const { label, link, icon, isNested, dense } = props
  const classes = useStyles()

  return (
    <ListItem
      classes={{
        root: clsx(classes.link, {
          [classes.linkNested]: isNested,
          [classes.linkDense]: dense,
        }),
        gutters: clsx(classes.linkGutters, { [classes.linkNestedGutters]: isNested }),
      }}
      component={NavLink}
      to={link}
      id={`dashboard_${link.split('/')[1]}_open`}
    >
      {icon && <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>}

      <ListItemText
        classes={{
          root: clsx(classes.title, {
            [classes.titleNested]: isNested,
          }),
          primary: clsx(classes.titleText, {
            [classes.titleTextNested]: isNested,
          }),
        }}
        primary={label}
      />
    </ListItem>
  )
}
