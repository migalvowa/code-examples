import { ReactNode } from 'react'

export interface ISidebarAppsListProps {
  items: ISidebarAppItem[]
  msRoute?: boolean
}

interface ISidebarAppItemProps {
  label: string
  icon: ReactNode
}

export interface ISidebarAppItemLinkProps extends ISidebarAppItemProps {
  link: string
  msRoute?: boolean
}

export interface ISidebarAppItem extends ISidebarAppItemLinkProps {
  status: boolean
}
