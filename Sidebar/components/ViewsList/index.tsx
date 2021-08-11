import React, { useState } from 'react'
import {
  ExpandMore as ExpandMoreIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Add as AddIcon,
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { Collapse, ListItem, ListItemText, IconButton } from '@material-ui/core'
import clsx from 'clsx'
import { SidebarItemLink as ItemLink } from '../ItemLink'
import useStyles from './styles'
import { ISidebarViewsListProps } from './types'

const SidebarViewsList = (props: ISidebarViewsListProps) => {
  const { items, onAddClick, isDrawerOpen, drawerWidth } = props
  const { t } = useTranslation()
  const classes = useStyles({ drawerWidth })

  const [isMenuOpen, setMenuOpen] = useState<boolean>(true)

  return (
    <>
      <ListItem
        classes={{
          root: classes.itemCollapsed,
        }}
      >
        <ListItemText
          classes={{
            root: clsx(classes.title, {
              [classes.titleExpanded]: isDrawerOpen,
            }),
            primary: classes.titleText,
          }}
          primary={t('Views')}
        />

        <IconButton onClick={onAddClick} className={classes.addIcon} size="small">
          <AddIcon />
        </IconButton>

        <IconButton className={classes.itemCollapsedIcon} size="small" onClick={() => setMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
        </IconButton>
      </ListItem>

      <Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
        {items.map((item) => (
          <ItemLink key={item.link} {...item} dense={true} />
        ))}
      </Collapse>
    </>
  )
}

export default React.memo(SidebarViewsList)
