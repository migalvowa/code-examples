import React from 'react'
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { MoreHoriz as MoreHorizIcon } from '@material-ui/icons'
import useStyles from './styles'
import { ISidebarSegmentsShowMoreButtonProps } from './types'

export const SidebarSegmentsShowMoreButton = (props: ISidebarSegmentsShowMoreButtonProps) => {
  const { label, onClick } = props
  const classes = useStyles()

  return (
    <ListItem
      classes={{
        root: classes.button,
        gutters: classes.buttonGutters,
      }}
      onClick={onClick}
    >
      <ListItemIcon className={classes.buttonIcon}>
        <MoreHorizIcon />
      </ListItemIcon>

      <ListItemText
        classes={{
          root: classes.buttonTitle,
          primary: classes.buttonTitleText,
        }}
        primary={label}
      />
    </ListItem>
  )
}
