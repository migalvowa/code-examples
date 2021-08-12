import { Theme, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  formActions: {
    padding: '24px 0',
    display: 'grid',
    gridGap: 16,

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
}))
