import { call, put, select } from 'redux-saga/effects'

import { SagaErrorFormatter, getErrorFormatter } from '../../utils'
import {
  FetchEntitiesListSagaConfig,
  RemoveEntitiesListSagaConfig,
} from '../types'
import { createRefreshListQuery } from '../utils'

export function* defaultSagaFetchList(
  config: FetchEntitiesListSagaConfig,
  action: ReturnType<typeof config.actions.fetch>
) {
  const { actions, api } = config
  try {
    const { query } = action.payload
    const response: ReturnTypeAsync<typeof api> = yield call(api, query)
    yield put(actions.fetched(response))
  } catch (e) {
    console.error(`[CRUD-saga:fetch-list]\n%o\nAction: %o`, e, action)
    const format: SagaErrorFormatter = yield call(getErrorFormatter)
    yield put(actions.error(format(e)))
  }
}

export function* defaultSagaRemoveList(
  config: RemoveEntitiesListSagaConfig,
  action: ReturnType<typeof config.actions.remove>
) {
  const { actions, selector, api } = config
  const { ids } = action.payload
  try {
    const state: ReturnType<typeof selector> = yield select(selector)

    yield call(api, ids)
    yield put(actions.removed(ids))

    // Reload list with the same query after removing items,
    // to get updated data accordingly to server-side pagination/sorting
    yield put(
      actions.fetch({
        query: createRefreshListQuery(
          state.data.total - ids.length,
          state.query
        ),
      })
    )
  } catch (e) {
    console.error(`[CRUD-saga:remove-many]\n%o\nAction: %o`, e, action)
    const format: SagaErrorFormatter = yield call(getErrorFormatter, {
      mapErrorCode: x => {
        if (x === 'DEPENDENCIES_EXISTS') {
          const count = ids.length
          return count > 1
            ? 'DEPENDENCIES_EXISTS_REMOVE_LIST'
            : 'DEPENDENCIES_EXISTS_REMOVE_LIST_ITEM'
        }
        return undefined
      },
    })
    yield put(actions.error(format(e)))
  }
}
