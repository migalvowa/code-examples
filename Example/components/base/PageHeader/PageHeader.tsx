import React from 'react'

import { Typography } from '@material-ui/core'

import clsx from 'clsx'

import PrevPageIcon from './PrevPageIcon'
import { useStyles } from './styles'
import { IPageHeaderProps } from './types'

export default React.forwardRef<HTMLElement, IPageHeaderProps>(
  function PageHeader(props: IPageHeaderProps, forwardRef) {
    const classes = useStyles()

    const {
      title,
      compact = false,
      left,
      right,
      footer,
      icon = <PrevPageIcon />,
      className,
    } = props

    return (
      <header
        ref={forwardRef}
        className={clsx(classes.header, className, {
          [classes.gutter]: compact,
          [classes.withFooter]: footer != null,
        })}
      >
        <div className={classes.titleWrapper}>
          {icon}
          <Typography
            variant={compact ? 'h3' : 'h2'}
            component="h2"
            className={classes.title}
          >
            {title}
          </Typography>
        </div>
        <div className={classes.actions}>
          {left && <div className={classes.left}>{left}</div>}
          {right && <div className={classes.right}>{right}</div>}
        </div>
        {footer && <div className={classes.footer}>{footer}</div>}
      </header>
    )
  }
)
