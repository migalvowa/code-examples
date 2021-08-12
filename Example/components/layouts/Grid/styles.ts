import { Theme, makeStyles } from '@material-ui/core'

import { StylesConfig } from './types'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gridGap: 16,
    [theme.breakpoints.up('md')]: {
      alignItems: 'baseline',
      gridTemplateColumns: ({ columns, inline }: StylesConfig) => {
        const templateColumns = inline ? 'auto-fill' : `repeat(${columns}, 1fr)`
        return columns > 1 ? templateColumns : 'none'
      },
      gridAutoFlow: ({ inline }: StylesConfig) =>
        inline ? 'column dense' : 'row',
      justifyContent: ({ inline }: StylesConfig) =>
        inline ? 'start' : 'normal',
      wordBreak: 'break-word',
    },
  },
  gutterBottom: {
    marginBottom: 8,
  },
  gap: {
    gridGap: 32,
  },
}))
