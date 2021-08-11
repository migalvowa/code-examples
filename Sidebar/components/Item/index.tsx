import React, { useState } from 'react'
import { ExpandMore as ExpandMoreIcon, KeyboardArrowRight as KeyboardArrowRightIcon } from '@material-ui/icons'
import { Collapse, ListItem, ListItemIcon, ListItemText, IconButton, useMediaQuery } from '@material-ui/core'
import { md } from 'theme'
import { SidebarItemLink as ItemLink } from '../ItemLink'
import useStyles from './styles'
import { ISidebarItemProps } from './types'

const SidebarItem = (props: ISidebarItemProps) => {
  const { label, link, icon, subItems, isCollapseOpen } = props
  const classes = useStyles()
  const isDesktop = useMediaQuery(md)

  const [isMenuOpen, setMenuOpen] = useState<boolean>(true)

  return (
    <>
      {subItems && subItems.length > 0 ? (
        <>
          <ListItem
            classes={{
              root: classes.itemCollapsed,
              gutters: classes.itemCollapsedGutters,
            }}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
            <ListItemText
              classes={{
                root: classes.title,
                primary: classes.titleText,
              }}
              primary={label}
            />
            <IconButton className={classes.itemCollapsedIcon} size="small">
              {isMenuOpen ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
          </ListItem>

          <Collapse in={isDesktop ? isMenuOpen && isCollapseOpen : isMenuOpen} timeout="auto" unmountOnExit>
            {subItems && subItems.map((item) => <ItemLink key={item.link} {...item} isNested={true} />)}
          </Collapse>
        </>
      ) : (
        <ItemLink label={label} link={link} icon={icon} />
      )}
    </>
  )
}

export default React.memo(SidebarItem)
