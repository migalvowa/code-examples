import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { List, Box, useMediaQuery, Drawer, Divider, IconButton, Tooltip } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import { NavigateBefore as NavigateBeforeIcon, NavigateNext as NavigateNextIcon } from '@material-ui/icons'
import { md } from 'theme'
import { ResizeIcon } from './icons'
import { SidebarAppTitle as AppTitle } from './components/AppTitle'
import Item from './components/Item'
import ViewsList from './components/ViewsList'
import { SidebarSegmentsList as SegmentsList } from './components/SegmentsList'
import { SidebarAppsListPopover as AppsListPopover } from './components/AppsListPopover'
import { StyledBackdrop } from './components/StyledComponents'
import { ISidebarProps } from './types'
import { ISidebarSegmentItem } from './components/SegmentsList/types'
import { ISidebarViewItem } from './components/ViewsList/types'
import useStyles from './styles'
import { useResizeSidebar } from './lib'
import { DEFAULT_DRAWER_WIDTH, MIN_DRAWER_WIDTH } from './constants'

function Sidebar({
  logo,
  appTitleData,
  itemsList,
  appsList,
  viewsList,
  segmentsList,
  onAddViewClick,
  onSegmentClick,
  segmentActionsMenu,
  activeSegmentId,
  msRoute = false,
}: ISidebarProps) {
  const {
    handleMouseDown,
    withTransition,
    isOpen: isDrawerOpen,
    width: drawerWidth,
    setSidebarState,
  } = useResizeSidebar()

  const classes = useStyles({ drawerWidth })
  const { t } = useTranslation()
  const isDesktop = useMediaQuery(md, { defaultMatches: true })

  const showViewsList = viewsList && viewsList.length > 0
  const showSegmentsList = segmentsList && segmentsList.length > 0 && (isDrawerOpen || !isDesktop)

  const [drawerVariant, setDrawerVariant] = useState<'permanent' | 'temporary'>(isDesktop ? 'permanent' : 'temporary')

  useEffect(() => {
    setDrawerVariant(isDesktop ? 'permanent' : 'temporary')
    setSidebarState({ isOpen: isDesktop && drawerWidth > MIN_DRAWER_WIDTH, width: drawerWidth })
  }, [isDesktop])

  const handleToggle = useCallback(() => {
    setSidebarState({
      isOpen: !isDrawerOpen,
      width: isDrawerOpen ? MIN_DRAWER_WIDTH : DEFAULT_DRAWER_WIDTH,
    })
  }, [isDrawerOpen])

  return (
    <Drawer
      variant={drawerVariant}
      anchor={'left'}
      open={isDrawerOpen}
      onClose={handleToggle}
      classes={{
        root: clsx(classes.drawer, {
          [classes.withTransition]: withTransition,
          [classes.withTransitionExpanded]: withTransition && isDrawerOpen,
        }),
        paper: clsx(classes.drawerPaper, {
          [classes.withTransition]: withTransition,
          [classes.withTransitionExpanded]: withTransition && isDrawerOpen,
        }),
      }}
      ModalProps={{
        keepMounted: true,
        BackdropComponent: StyledBackdrop,
      }}
    >
      <>
        {isDesktop && (
          <>
            {isDrawerOpen && (
              <IconButton className={classes.dragger} onMouseDown={handleMouseDown}>
                <ResizeIcon />
              </IconButton>
            )}

            <Tooltip
              title={(isDrawerOpen ? t('Close full view') : t('Open full view')) as string}
              placement="right-start"
            >
              <IconButton
                classes={{
                  root: clsx(classes.toggleDrawer, {
                    [classes.toggleDrawerExpanded]: isDrawerOpen,
                  }),
                  label: classes.toggleDrawerLabel,
                }}
                onClick={handleToggle}
              >
                {isDrawerOpen ? (
                  <NavigateBeforeIcon color="inherit" fontSize="inherit" />
                ) : (
                  <NavigateNextIcon color="inherit" fontSize="inherit" />
                )}
              </IconButton>
            </Tooltip>
          </>
        )}

        <aside className={classes.aside}>
          <Box className={classes.asideHeader}>
            {logo}

            <AppsListPopover items={appsList} msRoute={msRoute} />
          </Box>

          <Divider className={classes.divider} />

          <AppTitle data={appTitleData} />

          <List>
            {itemsList.length === 0
              ? Array.from(new Array(3)).map((_, i) => <Skeleton key={i} className={classes.skeleton} />)
              : itemsList.map((item) => <Item key={item.link} {...item} isCollapseOpen={isDrawerOpen} />)}

            {showViewsList && (
              <ViewsList
                onAddClick={onAddViewClick as NonNullable<ISidebarProps['onAddViewClick']>}
                items={viewsList as ISidebarViewItem[]}
                isDrawerOpen={isDrawerOpen}
                drawerWidth={drawerWidth}
              />
            )}

            {showSegmentsList && (
              <SegmentsList
                onSegmentClick={onSegmentClick as NonNullable<ISidebarProps['onSegmentClick']>}
                segmentActionsMenu={segmentActionsMenu}
                items={segmentsList as ISidebarSegmentItem[]}
                activeSegmentId={activeSegmentId}
                drawerWidth={drawerWidth}
              />
            )}
          </List>
        </aside>
      </>
    </Drawer>
  )
}

export default React.memo(Sidebar)
