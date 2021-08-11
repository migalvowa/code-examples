import { createStyles, makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) =>
  createStyles({
    appTitle: {
      display: 'flex',
      alignItems: 'center',
      color: theme.custom.activeColor,
      padding: theme.spacing(6.4, 4, 2.4),
    },
    appIcon: {
      display: 'flex',
    },
    appTitleText: {
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 'bold',
      letterSpacing: 'normal',
      color: theme.custom.activeColor,
      paddingLeft: theme.spacing(3.2),
    },
    appTitleTextWithoutIndent: {
      paddingLeft: 0,
    },
  })
)
