import { ReactNode } from 'react'

export interface IPageHeaderProps {
  title: string
  compact?: boolean
  className?: string
  left?: ReactNode
  right?: ReactNode
  footer?: ReactNode
  icon?: ReactNode
}
