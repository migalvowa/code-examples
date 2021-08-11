import { createStyles, makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) =>
  createStyles({
    itemControlled: {
      color: theme.custom.inactiveColor,
      paddingTop: theme.spacing(0.8),
      paddingBottom: theme.spacing(0.8),
      transition: '.2s',
      cursor: 'pointer',
      '&:hover': {
        color: theme.custom.activeColor,
        backgroundColor: theme.custom.sideBarHoverLinkBg,
      },
      '&.active': {
        color: theme.custom.activeColor,
      },
      '& *': {
        color: 'inherit',
      },
      [theme.breakpoints.up('md')]: {
        '&:hover $actionsMenu': {
          opacity: 1,
        },
      },
    },
    itemControlledGutters: {
      paddingLeft: 0,
      paddingRight: theme.spacing(4),
    },
    itemSelected: {
      color: theme.custom.activeColor,
    },
    icon: {
      minWidth: 0,
      color: 'inherit',
      transition: '.2s transform',
    },
    title: {
      paddingLeft: theme.spacing(3.2),
      margin: 0,
    },
    titleText: {
      fontSize: 16,
      lineHeight: 'normal',
      letterSpacing: 'normal',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    actionsMenu: {
      [theme.breakpoints.up('md')]: {
        opacity: 0,
      },
    },
  })
)
