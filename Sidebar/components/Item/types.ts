import { ReactNode } from 'react'

export interface ISidebarSubItem {
  label: string
  link: string
}

export interface ISidebarItem extends ISidebarSubItem {
  icon: ReactNode
  subItems?: ISidebarSubItem[]
}

export interface ISidebarItemProps extends ISidebarItem {
  isCollapseOpen: boolean
}
