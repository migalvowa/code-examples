import React from 'react'

import { Typography } from '@material-ui/core'

import Grid from '../Grid'

import { ICardFieldProps } from './types'

const CardField = (props: ICardFieldProps) => {
  const { title, children, vertical = false, icon = null } = props

  const $content = (
    <>
      <Typography variant="h5" gutterBottom={vertical}>
        {title}
      </Typography>
      <Typography variant="body1" component="div" gutterBottom={vertical}>
        {children}
      </Typography>
    </>
  )

  const $alignedContent = vertical ? (
    <div>{$content}</div>
  ) : (
    <Grid columns={2} inline>
      {$content}
    </Grid>
  )

  if (icon != null) {
    return (
      <Grid columns={2} inline>
        <div>{icon}</div>
        {$alignedContent}
      </Grid>
    )
  }

  return $alignedContent
}

export default CardField
