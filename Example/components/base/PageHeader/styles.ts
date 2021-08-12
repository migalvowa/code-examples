import { Theme, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'grid',
    gap: theme.spacing(3),
    alignItems: 'center',
    minHeight: 71,
    padding: theme.spacing(3, 0, 3),
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
      padding: theme.spacing(0, 0, 3, 0),
      gridTemplateColumns: 'auto 1fr',
    },
  },
  withFooter: {
    [theme.breakpoints.up('md')]: {
      gridTemplateRows: '1fr auto',
      gridTemplateAreas: `'. .'
        'footer footer'`,
    },
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 0,
  },
  title: {
    position: 'relative',
    display: 'flex',
    wordBreak: 'break-word',
  },
  actions: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      gap: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },
  left: {
    display: 'grid',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'flex-end',
      flexGrow: 1,
      marginBottom: 0,
    },
  },
  right: {
    display: 'grid',
    gap: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginLeft: 'auto',
      alignItems: 'flex-end',
      justifyContent: 'end',
      gridTemplateColumns: 'auto',
      gridAutoFlow: 'column dense',
    },
  },
  footer: {
    [theme.breakpoints.up('md')]: {
      gridArea: 'footer',
    },
  },
  gutter: {
    padding: theme.spacing(5, 5, 2),
  },
}))
