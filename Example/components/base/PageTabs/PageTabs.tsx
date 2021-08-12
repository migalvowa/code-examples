import React from 'react'

import { Tab } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'

import { useStyles } from './styles'
import { IPageTabsProps, ITabConfig } from './types'

const EMPTY_TAB_VALUE = '@@/EMPTY_TAB_VALUE' // should be symbol, but TabContext only accepts string
const EMPTY_TAB_CONFIG: ITabConfig = {
  id: EMPTY_TAB_VALUE,
  label: '',
}

const MIN_TAB_WIDTH = 160

export default function PageTabs(props: IPageTabsProps) {
  const { activeTab, tabs, defaultTabContent } = props
  const classes = useStyles()

  return (
    <TabContext value={activeTab ?? EMPTY_TAB_VALUE}>
      {tabs.map(config => {
        const { id, content = defaultTabContent } = config
        return (
          <TabPanel key={id} value={id} style={{ padding: 0 }}>
            {typeof content === 'function' ? content({ id }) : content}
          </TabPanel>
        )
      })}

      {/* TODO: add max tab height (restrict to page header height – a it's a PageTabs); handle tab text overflow */}
      <TabList
        textColor="primary"
        indicatorColor="primary"
        classes={{ flexContainer: classes.flexContainer }}
        style={{ minWidth: MIN_TAB_WIDTH * tabs.length }}
      >
        {tabs.concat(EMPTY_TAB_CONFIG).map(config => {
          const { id, label } = config

          if (id === EMPTY_TAB_VALUE) {
            // this serves as `default` in `switch-case`.
            // If no tab matches TabContext.value, there will be error in console.
            return <Tab key={id} value={id} style={{ display: 'none' }} />
          }

          return <Tab {...getTabProps(id, label)} key={id} value={id} />
        })}
      </TabList>
    </TabContext>
  )
}

function getTabProps(id: ITabConfig['id'], label: ITabConfig['label']) {
  let $child: JSX.Element
  if (typeof label === 'function') {
    $child = label({ id })
  } else if (React.isValidElement(label)) {
    $child = label
  } else {
    return { label }
  }

  const { children, ...rest } = $child.props
  return {
    ...rest,
    component: $child.type,
    label: children,
  }
}
