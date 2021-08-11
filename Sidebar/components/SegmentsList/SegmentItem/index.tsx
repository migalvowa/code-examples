import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Bookmark as BookmarkIcon } from '@material-ui/icons'
import useStyles from './styles'
import { ISidebarSegmentItemProps } from './types'

export const SidebarSegmentItem = (props: ISidebarSegmentItemProps) => {
  const { label, onClick, actionsMenu, selected, icon = <BookmarkIcon /> } = props
  const classes = useStyles()

  return (
    <ListItem
      onClick={onClick}
      selected={selected}
      classes={{
        root: classes.itemControlled,
        gutters: classes.itemControlledGutters,
        selected: classes.itemSelected,
      }}
    >
      <div className={classes.actionsMenu} onClick={(e) => e.stopPropagation()}>
        {actionsMenu}
      </div>

      {icon && <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>}

      <ListItemText
        classes={{
          root: classes.title,
          primary: classes.titleText,
        }}
        primary={label}
      />
    </ListItem>
  )
}
