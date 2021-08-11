import { createStyles, makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) =>
  createStyles({
    appsIcon: {
      flexShrink: 1,
      overflow: 'hidden',
      padding: 0,
      marginLeft: theme.spacing(2.4),
      color: theme.custom.inactiveColor,
      '&:hover': {
        color: theme.custom.activeColor,
      },
    },
    appsIconActive: {
      color: theme.custom.activeColor,
    },
    popoverPaper: {
      marginTop: theme.spacing(4.8),
      marginLeft: theme.spacing(-4.8),
    },
    popoverContainer: {
      width: 420,
      padding: theme.spacing(6.4),
    },
    modalContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(8, 3.2, 3.2),
      backgroundColor: theme.palette.white,
    },
    closeIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    app: {
      marginBottom: theme.spacing(4.8),
      [theme.breakpoints.up('md')]: {
        width: '50%',
        '&:nth-child(odd)': {
          paddingRight: theme.spacing(1.6),
        },
        '&:nth-child(even)': {
          paddingLeft: theme.spacing(1.6),
        },
      },
      '&:hover $appIcon': {
        backgroundColor: theme.custom.primaryLight,
      },
    },
    appsList: {
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    },
    appContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: 0,
    },
    appIcon: {
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      borderRadius: 3,
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.white,
      marginRight: theme.spacing(1.6),
      transition: '.2s',
    },
    icon: {
      minWidth: 0,
      color: 'inherit',
      transition: '.2s transform',
    },
    appTitle: {
      fontSize: 14,
      lineHeight: 1.29,
      fontWeight: 500,
      letterSpacing: 0.18,
      color: '#1e2024',
    },
    appTitleText: {
      lineHeight: 1.29,
      fontWeight: 500,
      letterSpacing: 0.18,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })
)
