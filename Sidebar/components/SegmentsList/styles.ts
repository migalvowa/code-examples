import { createStyles, makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) =>
  createStyles({
    segmentsList: {
      display: ({ drawerWidth }: { drawerWidth: number }) => (drawerWidth < 100 ? 'none' : 'block'),
    },
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
      margin: 0,
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
    itemCollapsedIcon: {
      padding: 0,
      transition: '.2s',
      '&:hover': {
        color: theme.custom.activeColor,
      },
    },
  })
)
