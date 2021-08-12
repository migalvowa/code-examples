import { push } from 'connected-react-router'
import { generatePath } from 'react-router-dom'

import { call, put } from 'redux-saga/effects'

import { SagaErrorFormatter, getErrorFormatter } from '../../utils'
import { FetchEntitySagaConfig, RemoveEntitySagaConfig } from '../types'

export function* defaultSagaFetchEntity(
  config: FetchEntitySagaConfig,
  action: ReturnType<typeof config.actions.fetch>
) {
  const { api, actions } = config
  try {
    const { id } = action.payload
    const response: ReturnTypeAsync<typeof api> = yield call(api, id)
    yield put(actions.fetched(response))
  } catch (e) {
    console.error(`[CRUD-saga:fetch-view]\n%o\nAction: %o`, e, action)
    const format: SagaErrorFormatter = yield call(getErrorFormatter)
    yield put(actions.error(format(e)))
  }
}

export function* defaultSagaRemoveEntity(
  config: RemoveEntitySagaConfig,
  action: ReturnType<typeof config.actions.remove>
) {
  const { api, actions, routes } = config
  try {
    const { id } = action.payload
    yield call(api, id)
    yield put(actions.removed({ id }))
    yield put(push(generatePath(routes.list)))
  } catch (e) {
    console.error(`[CRUD-saga:remove-one]\n%o\nAction: %o`, e, action)
    const format: SagaErrorFormatter = yield call(getErrorFormatter, {
      mapErrorCode: x => {
        if (x === 'DEPENDENCIES_EXISTS') {
          return 'DEPENDENCIES_EXISTS_REMOVE_DETAILS'
        }
        return undefined
      },
    })
    yield put(actions.error(format(e)))
  }
}
