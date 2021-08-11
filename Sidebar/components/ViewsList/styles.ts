import { createStyles, makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) =>
  createStyles({
    itemCollapsed: {
      color: theme.custom.inactiveColor,
      paddingTop: theme.spacing(2.4),
      paddingBottom: theme.spacing(2.4),
      marginTop: theme.spacing(3.2),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(4.8),
      },
      '& *': {
        color: 'inherit',
      },
    },
    title: {
      width: ({ drawerWidth }: { drawerWidth: number }) => (drawerWidth < 130 ? '100%' : 'auto'),
      flexShrink: 0,
      margin: 0,
    },
    titleExpanded: {
      width: 'auto',
    },
    titleText: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 'normal',
      letterSpacing: 0.3,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    addIcon: {
      flexShrink: 1,
      overflow: 'hidden',
      padding: 0,
      marginRight: theme.spacing(1.8),
      transition: '.2s',
      '&:hover': {
        color: theme.custom.activeColor,
      },
    },
    itemCollapsedIcon: {
      flexShrink: 1,
      overflow: 'hidden',
      padding: 0,
      transition: '.2s',
      '&:hover': {
        color: theme.custom.activeColor,
      },
    },
  })
)
