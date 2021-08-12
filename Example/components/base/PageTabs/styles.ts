import { Theme, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  flexContainer: {
    borderBottom: `2px solid ${theme.custom.borderColor}`,
  },
}))
