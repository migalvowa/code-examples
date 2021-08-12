import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  timePicker: {
    '&.MuiInput-underline': {
      paddingTop: '12px',
      paddingBottom: '12px',
    },
  },
  label: {
    maxWidth: 'calc(100% - 64px)',
    display: 'flex',
    whiteSpace: 'nowrap',
  },
}))
