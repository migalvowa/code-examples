import { createStyles, makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) =>
  createStyles({
    link: {
      position: 'relative',
      color: theme.custom.inactiveColor,
      paddingTop: theme.spacing(2.4),
      paddingBottom: theme.spacing(2.4),
      transition: '.2s',
      '&:hover': {
        color: theme.custom.activeColor,
        backgroundColor: theme.custom.sideBarHoverLinkBg,
      },
      '&.active': {
        color: theme.custom.activeColor,
        '&:before': {
          content: "''",
          position: 'absolute',
          left: 0,
          top: 4,
          bottom: 4,
          width: 4,
          borderTopRightRadius: 3,
          borderBottomRightRadius: 3,
          backgroundColor: theme.palette.primary.main,
        },
      },
      '& *': {
        color: 'inherit',
      },
    },
    linkNested: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      '&.active:before': {
        content: 'none',
      },
    },
    linkDense: {
      paddingTop: theme.spacing(1.4),
      paddingBottom: theme.spacing(1.4),
    },
    linkGutters: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    linkNestedGutters: {
      paddingLeft: theme.spacing(12),
    },
    icon: {
      minWidth: 0,
      color: 'inherit',
      transition: '.2s transform',
    },
    title: {
      paddingLeft: theme.spacing(3.2),
      margin: 0,
    },
    titleNested: {
      paddingLeft: 0,
    },
    titleText: {
      fontSize: 16,
      lineHeight: 'normal',
      letterSpacing: 'normal',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    titleTextNested: {
      lineHeight: '22px',
    },
  })
)
