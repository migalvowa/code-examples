import { ReactNode } from 'react'

export interface ISidebarAppTitleProps {
  data: ISidebarAppTitle
}

export interface ISidebarAppTitle {
  label: string
  icon?: ReactNode
}
