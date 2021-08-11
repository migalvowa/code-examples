import { createStyles, makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) =>
  createStyles({
    itemCollapsed: {
      color: theme.custom.inactiveColor,
      paddingTop: theme.spacing(2.2),
      paddingBottom: theme.spacing(2.2),
      transition: '.2s',
      cursor: 'pointer',
      '&:hover': {
        color: theme.custom.activeColor,
        backgroundColor: theme.custom.sideBarHoverLinkBg,
      },
      '& *': {
        color: 'inherit',
      },
    },
    itemCollapsedGutters: {
      paddingLeft: theme.spacing(4),
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
    itemCollapsedIcon: {
      flexShrink: 1,
      overflow: 'hidden',
      padding: 0,
    },
  })
)
