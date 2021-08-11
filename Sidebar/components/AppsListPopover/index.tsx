import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, generatePath } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import routes from 'routes'
import clsx from 'clsx'
import { Box, Button, useMediaQuery, IconButton, Popover, Modal } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { md } from 'theme'
import { selectSpaces } from 'stores/selectors/spaces'
import { isOrganizationOwner } from 'utils'
import { SidebarAppsList as AppsList } from './AppsList'
import { AppsIcon } from '../../icons'
import { ISidebarAppsListProps } from './types'
import useStyles from './styles'
import { DEFAULT_PAPER_ELEVATION } from '../../constants'
import { REGULAR_USER_ROLE } from 'constant'

export const SidebarAppsListPopover = ({ items, msRoute }: ISidebarAppsListProps) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const isDesktop = useMediaQuery(md)
  const { spaceInfo, role } = useSelector(selectSpaces())

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const appsMenu = (
    <Box
      className={clsx({
        [classes.popoverContainer]: isDesktop,
        [classes.modalContainer]: !isDesktop,
      })}
    >
      {!isDesktop && (
        <IconButton size="small" color="secondary" className={classes.closeIcon} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      )}

      <AppsList items={items} msRoute={msRoute} />

      {spaceInfo && isOrganizationOwner(role) && (
        <Button
          component={Link}
          to={generatePath(routes.applicationsEdit, { id: spaceInfo.id })}
          onClick={handleClose}
          variant="outlined"
          color="primary"
          fullWidth
        >
          {t('Manage apps')}
        </Button>
      )}
    </Box>
  )

  return (
    <>
      <IconButton
        id="sidebar_open"
        disabled={role === REGULAR_USER_ROLE && !Boolean(items.length)}
        classes={{
          root: clsx(classes.appsIcon, {
            [classes.appsIconActive]: Boolean(anchorEl),
          }),
        }}
        onClick={handleClick}
      >
        <AppsIcon fill="inherit" />
      </IconButton>

      {isDesktop ? (
        <Popover
          elevation={DEFAULT_PAPER_ELEVATION}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          keepMounted
          classes={{
            paper: classes.popoverPaper,
          }}
        >
          {appsMenu}
        </Popover>
      ) : (
        <Modal open={Boolean(anchorEl)} onClose={handleClose}>
          {appsMenu}
        </Modal>
      )}
    </>
  )
}
