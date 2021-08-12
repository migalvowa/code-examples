import { ReactNode } from 'react'

export interface ICardProps {
  title: string
  header?: ReactNode
  children?: ReactNode
  gutter?: boolean
  gap?: boolean
}
