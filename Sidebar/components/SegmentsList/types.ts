import { ReactNode } from 'react'

export interface ISidebarSegmentsListProps {
  items: ISidebarSegmentItem[]
  onSegmentClick: (id: string) => void
  segmentActionsMenu: ReactNode
  drawerWidth: number
  activeSegmentId?: string
}

export interface ISidebarSegmentItem {
  id: string
  label: string
  icon?: ReactNode
}
