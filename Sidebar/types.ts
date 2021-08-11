import { ReactNode } from 'react'
import { ISidebarAppTitle } from './components/AppTitle/types'
import { ISidebarItem } from './components/Item/types'
import { ISidebarAppItem } from './components/AppsListPopover/types'
import { ISidebarViewItem } from './components/ViewsList/types'
import { ISidebarSegmentItem } from './components/SegmentsList/types'

export interface ISidebarProps {
  logo: ReactNode
  appTitleData: ISidebarAppTitle
  itemsList: ISidebarItem[]
  appsList: ISidebarAppItem[]
  viewsList?: ISidebarViewItem[]
  segmentsList?: ISidebarSegmentItem[]
  onAddViewClick?: () => void
  onSegmentClick?: (id: string) => void
  segmentActionsMenu?: ((props: { id: string }) => ReactNode) | ReactNode
  activeSegmentId?: string
  msRoute?: boolean
}
