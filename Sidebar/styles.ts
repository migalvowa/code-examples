import { createStyles, makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: ({ drawerWidth }: { drawerWidth: number }) => drawerWidth,
      },
      [theme.breakpoints.down('sm')]: {
        top: `${theme.custom.headerHeight}px !important`,
      },
    },
    withTransition: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    withTransitionExpanded: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaper: {
      overflowY: 'unset',
      borderRight: 'unset',
      [theme.breakpoints.up('md')]: {
        width: ({ drawerWidth }: { drawerWidth: number }) => drawerWidth,
      },
      [theme.breakpoints.down('sm')]: {
        width: 264,
        height: `calc(100% - ${theme.custom.headerHeight}px)`,
        top: theme.custom.headerHeight,
      },
    },
    dragger: {
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',
      zIndex: 1,
      cursor: 'ew-resize',
    },
    toggleDrawer: {
      position: 'absolute',
      top: theme.custom.headerHeight,
      left: 'calc(100% - 9px)',
      transform: 'translateY(-50%)',
      zIndex: 1,
      width: 24,
      height: 24,
      display: 'flex',
      fontSize: 20,
      padding: 0,
      borderRadius: 12,
      color: theme.palette.black,
      backgroundColor: theme.palette.white,
      transition: '.2s',
      boxShadow: '0 2px 8px 4px rgba(75, 75, 75, 0.2)',
      '&:hover': {
        width: 34,
        justifyContent: 'flex-end',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
      },
    },
    toggleDrawerExpanded: {
      '&:hover': {
        justifyContent: 'flex-start',
      },
    },
    toggleDrawerLabel: {
      padding: theme.spacing(0.4),
    },
    aside: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      backgroundColor: theme.custom.sideBarBg,
      userSelect: 'none',
    },
    asideHeader: {
      height: theme.custom.headerHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      padding: theme.spacing(0, 3.2),
    },
    divider: {
      backgroundColor: theme.custom.sidebarDividerColor,
    },
    skeleton: {
      backgroundColor: '#f9f9f933',
      margin: theme.spacing(1.6, 3.2),
      height: '40px',
    },
  })
)
