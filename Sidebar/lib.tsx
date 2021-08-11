import React from 'react'
import { MIN_DRAWER_WIDTH, MAX_DRAWER_WIDTH, DEFAULT_DRAWER_WIDTH } from './constants'
import { useCallback } from 'react'
import { useLocalStorage } from '@rehooks/local-storage'

interface SidebarState {
  isOpen: boolean
  width: number
}

const INITIAL_STATE: SidebarState = {
  isOpen: true,
  width: DEFAULT_DRAWER_WIDTH,
}

const LOCAL_STORAGE_KEY = 'fdlt.sidebar'

export function useSidebarPersistedState() {
  const [sidebarState, setSidebarState] = useLocalStorage<SidebarState>(LOCAL_STORAGE_KEY, INITIAL_STATE)

  const toggleSidebar = useCallback(
    () => setSidebarState({ ...sidebarState, isOpen: !sidebarState.isOpen }),
    [setSidebarState, sidebarState]
  )

  const setSidebarWidth = useCallback(
    (width: number) => setSidebarState({ ...sidebarState, width }),
    [setSidebarState, sidebarState]
  )

  return {
    ...sidebarState,
    setSidebarState,
    toggleSidebar,
    setSidebarWidth,
  }
}

export function useResizeSidebar() {
  const sidebarState = useSidebarPersistedState()
  const { setSidebarState, setSidebarWidth } = sidebarState
  const [withTransition, setWithTransition] = React.useState(true)

  let width = 0

  const handleMouseMove = (e: MouseEvent) => {
    const newWidth = e.clientX - document.body.offsetLeft
    if (newWidth >= MIN_DRAWER_WIDTH && newWidth <= MAX_DRAWER_WIDTH) {
      width = newWidth
    } else if (newWidth > MAX_DRAWER_WIDTH) {
      width = MAX_DRAWER_WIDTH
    } else if (newWidth < MIN_DRAWER_WIDTH) {
      width = MIN_DRAWER_WIDTH
    }
    setSidebarWidth(width)
  }

  const handleMouseUp = () => {
    setWithTransition(true)
    if (width === MIN_DRAWER_WIDTH) {
      setSidebarState({ isOpen: false, width })
    }
    document.removeEventListener('mouseup', handleMouseUp, true)
    document.removeEventListener('mousemove', handleMouseMove, true)
  }

  const handleMouseDown = () => {
    setWithTransition(false)
    document.addEventListener('mouseup', handleMouseUp, true)
    document.addEventListener('mousemove', handleMouseMove, true)
  }

  return {
    handleMouseDown,
    withTransition,
    ...sidebarState,
  }
}
