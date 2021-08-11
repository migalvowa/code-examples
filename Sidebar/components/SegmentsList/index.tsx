import React, { useState } from 'react'
import { Box, ListItem, ListItemText, IconButton, Collapse } from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon, KeyboardArrowRight as KeyboardArrowRightIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { SidebarSegmentItem as SegmentItem } from './SegmentItem'
import { SidebarSegmentsShowMoreButton as ShowMoreButton } from './ShowMoreButton'
import useStyles from './styles'
import { ISidebarSegmentsListProps } from './types'

export const SidebarSegmentsList = (props: ISidebarSegmentsListProps) => {
  const { items, onSegmentClick, segmentActionsMenu, activeSegmentId, drawerWidth } = props
  const { t } = useTranslation()
  const classes = useStyles({ drawerWidth })

  const [isMenuOpen, setMenuOpen] = useState<boolean>(true)

  const [showMore, setShowMore] = useState<boolean>(false)
  const toggleShowMoreButton = () => setShowMore(!showMore)
  const itemsToShow = showMore ? items : items.slice(0, 4)
  const showMoreButtonText = items.length > itemsToShow.length ? t('Show All') : t('Show Less')

  return (
    <Box className={classes.segmentsList}>
      <ListItem
        classes={{
          root: classes.itemCollapsed,
        }}
      >
        <ListItemText
          classes={{
            root: classes.title,
            primary: classes.titleText,
          }}
          primary={t('Saved Segments')}
        />

        <IconButton className={classes.itemCollapsedIcon} size="small" onClick={() => setMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
        </IconButton>
      </ListItem>

      <Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
        {itemsToShow.map((item) => (
          <SegmentItem
            key={item.id}
            {...item}
            selected={activeSegmentId === item.id}
            onClick={() => onSegmentClick(item.id)}
            actionsMenu={
              typeof segmentActionsMenu === 'function' ? segmentActionsMenu({ id: item.id }) : segmentActionsMenu
            }
          />
        ))}

        {items.length > 4 && <ShowMoreButton label={showMoreButtonText} onClick={toggleShowMoreButton} />}
      </Collapse>
    </Box>
  )
}
