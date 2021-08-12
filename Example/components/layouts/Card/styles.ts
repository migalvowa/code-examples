import { Theme, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  header: {
    padding: theme.spacing(4, 5),
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      alignItems: 'center',
      padding: theme.spacing(4, 5, 5),
    },
  },
  headerActions: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
    },
  },
  gutter: {
    padding: theme.spacing(0, 5, 5, 5),
    maxWidth: 722,
  },
  body: {
    display: 'grid',
    gap: 16,
  },
  gap: {
    gap: 32,
  },
}))
