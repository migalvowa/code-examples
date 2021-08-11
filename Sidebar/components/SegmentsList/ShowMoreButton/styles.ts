import { createStyles, makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: theme.custom.inactiveColor,
      paddingTop: theme.spacing(0.8),
      paddingBottom: theme.spacing(0.8),
      transition: '.2s',
      cursor: 'pointer',
      '&:hover': {
        color: theme.custom.activeColor,
        backgroundColor: theme.custom.sideBarHoverLinkBg,
      },
      '& *': {
        color: 'inherit',
      },
    },
    buttonGutters: {
      paddingLeft: theme.spacing(4.8),
      paddingRight: theme.spacing(4),
    },
    buttonIcon: {
      minWidth: 0,
      color: 'inherit',
      transition: '.2s transform',
    },
    buttonTitle: {
      paddingLeft: theme.spacing(3.2),
      margin: 0,
    },
    buttonTitleText: {
      fontSize: 16,
      lineHeight: 'normal',
      letterSpacing: 'normal',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })
)
