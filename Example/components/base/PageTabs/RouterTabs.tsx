import React from 'react'
import { Link, generatePath, useRouteMatch } from 'react-router-dom'

import PageTabs from './PageTabs'
import { IRouterTabsProps } from './types'

export default function RouterTabs(props: IRouterTabsProps) {
  const { tabs, ...rest } = props

  const match = useRouteMatch({
    path: tabs.map(tab => tab.id),
    exact: true,
  })

  return (
    <PageTabs
      {...rest}
      activeTab={match?.path}
      tabs={tabs.map(tab => {
        const { params, label, ...rest } = tab
        return {
          ...rest,
          label: ({ id }) => {
            const resolvedParams =
              typeof params === 'function' ? params({ id }) : params
            return <Link to={generatePath(id, resolvedParams)}>{label}</Link>
          },
        }
      })}
    />
  )
}
