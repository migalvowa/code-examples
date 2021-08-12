import { Theme, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  richTextField: {
    padding: theme.spacing(2, 3, 3),
  },
  root: {
    minHeight: '160px',
    height: '100%',
  },
  toolbar: {
    margin: theme.spacing(3, -3, 0),
  },
}))
