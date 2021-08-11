import { withStyles, Theme, Backdrop } from '@material-ui/core'

export const StyledBackdrop = withStyles((theme: Theme) => ({
  root: {
    top: 0,
    [theme.breakpoints.down('sm')]: {
      top: theme.custom.headerHeight,
    },
  },
}))(Backdrop)
