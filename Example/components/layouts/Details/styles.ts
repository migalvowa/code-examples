import { Theme, makeStyles } from '@material-ui/core'

import { StylesConfig } from './types'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gap: theme.spacing(5),
    padding: theme.spacing(5, 0),
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: ({ aside }: StylesConfig) =>
        aside ? '1fr minmax(408px, 36.46%)' : '1fr',
      alignItems: 'start',
      paddingTop: 0,
    },
  },
  children: {
    display: 'grid',
    gap: theme.spacing(5),
  },
}))
