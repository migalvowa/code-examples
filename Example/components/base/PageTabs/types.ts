import { FunctionComponent, ReactChild } from 'react'
import { generatePath } from 'react-router-dom'

type TabID = string
type RouteParams = Parameters<typeof generatePath>[1]

interface IBaseTabConfig {
  id: TabID
  label: ReactChild | ((params: { id: TabID }) => JSX.Element)
  content?: ReactChild | FunctionComponent<{ id: TabID }>
}

export interface ITabConfig extends IBaseTabConfig {}

export interface IRouterTabConfig extends IBaseTabConfig {
  params?: RouteParams | ((params: { id: TabID }) => RouteParams)
}

// ---

interface IBaseTabsProps<TabConfig> {
  defaultTabContent?: IBaseTabConfig['content']
  tabs: TabConfig[]
}

export interface IPageTabsProps extends IBaseTabsProps<ITabConfig> {
  activeTab?: TabID
}

export interface IRouterTabsProps extends IBaseTabsProps<IRouterTabConfig> {}
