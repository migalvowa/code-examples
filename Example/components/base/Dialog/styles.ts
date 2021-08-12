import { Theme, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  subtitle: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
