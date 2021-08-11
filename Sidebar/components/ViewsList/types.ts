import { ReactNode } from 'react'
import { ISidebarSubItem } from '../Item/types'

export interface ISidebarViewsListProps {
  items: ISidebarViewItem[]
  onAddClick: () => void
  isDrawerOpen: boolean
  drawerWidth: number
}

export interface ISidebarViewItem extends ISidebarSubItem {
  icon: ReactNode
}
