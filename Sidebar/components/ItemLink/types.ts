import { ReactNode } from 'react'
import { ISidebarSubItem } from '../Item/types'

export interface ISidebarItemLinkProps extends ISidebarSubItem {
  icon?: ReactNode
  isNested?: boolean
  dense?: boolean
}
