import { ReactNode } from 'react'

export interface IGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  inline?: boolean
  gutterBottom?: boolean
  gap?: true
}

export type StylesConfig = {
  columns: Pick<IGridProps, 'columns'>
  inline: Pick<IGridProps, 'inline'>
}
