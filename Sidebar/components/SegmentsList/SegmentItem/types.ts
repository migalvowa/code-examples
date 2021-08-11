import { ReactNode } from 'react'

export interface ISidebarSegmentItemProps {
  label: string
  onClick: () => void
  actionsMenu: ReactNode
  icon?: ReactNode
  selected?: boolean
}
