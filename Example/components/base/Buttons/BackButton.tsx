import React from 'react'

import { IconButton, Theme, makeStyles } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'

import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '0 6px 0 -12px',
    [theme.breakpoints.up('md')]: {
      margin: '0 16px 0 -12px',
    },
  },
}))

interface IBackButtonProps {
  onClick?: () => void
  className?: string
}

export default React.forwardRef<HTMLButtonElement, IBackButtonProps>(
  function BackButton(props, ref) {
    const { onClick, className } = props
    const classes = useStyles()
    return (
      <IconButton
        ref={ref}
        color="inherit"
        aria-label="back"
        onClick={onClick}
        className={clsx(classes.root, className)}
      >
        <ArrowBackIcon color="inherit" />
      </IconButton>
    )
  }
)
