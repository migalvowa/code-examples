import { push } from 'connected-react-router'
import { generatePath } from 'react-router-dom'

import { call, put, select } from 'redux-saga/effects'

import { SagaErrorFormatter, getErrorFormatter } from '../../utils'
import {
  CancelCreateEntitySagaConfig,
  CancelUpdateEntitySagaConfig,
  CreateEntitySagaConfig,
  PrepareCreateEntitySagaConfig,
  PrepareUpdateEntitySagaConfig,
  UpdateEntitySagaConfig,
} from '../types'

//#region update
export function* defaultSagaPrepareEntityUpdateForm(
  config: PrepareUpdateEntitySagaConfig,
  action: ReturnType<typeof config.actions.prepare>
) {
  const { api, actions } = config
  try {
    const { id } = action.payload
    const entity: ReturnTypeAsync<typeof api> = yield call(api, id)
    yield put(actions.prepared(entity))
  } catch (e) {
    console.error(`[CRUD-saga:prepare-update]\n%o\nAction: %o`, e, action)
    const format: SagaErrorFormatter = yield call(getErrorFormatter)
    yield put(actions.error(format(e, true)))
  }
}

export function* defaultSagaUpdateEntity(
  config: UpdateEntitySagaConfig,
  action: ReturnType<typeof config.actions.submit>
) {
  const { api, actions, routes } = config
  try {
    const { id, data } = action.payload
    const entity: ReturnTypeAsync<typeof api> = yield call(api, id, data)
    yield put(actions.submitted(entity))
    yield put(push(generatePath(routes.details, { id })))
  } catch (e) {
    console.error(`[CRUD-saga:update]\n%o\nAction: %o`, e, action)
    const format: SagaErrorFormatter = yield call(getErrorFormatter, {
      mapErrorCode: x => {
        if (x === 'DEPENDENCIES_EXISTS') {
          return 'DEPENDENCIES_EXISTS_UPDATE_DETAILS'
        }
        return undefined
      },
    })
    yield put(actions.error(format(e, true)))
  }
}

export function* defaultSagaCancelUpdateEntityForm(
  config: CancelUpdateEntitySagaConfig,
  action: ReturnType<typeof config.actions.cancel>
) {
  const { actions, routes, selector } = config
  const { data: entity }: ReturnType<typeof selector> = yield select(selector)
  yield put(actions.canceled())
  yield put(push(generatePath(routes.details, { id: entity.id })))
}
//#endregion

//#region create
export function* defaultSagaPrepareEntityCreateForm(
  config: PrepareCreateEntitySagaConfig,
  action: ReturnType<typeof config.actions.prepare>
) {
  const { api, actions } = config
  try {
    const schema: ReturnTypeAsync<typeof api> = yield call(api)
    yield put(actions.prepared(schema))
  } catch (e) {
    console.error(`[CRUD-saga:get-schema]\n%o\nAction: %o`, e, action)
    const format: SagaErrorFormatter = yield call(getErrorFormatter)
    yield put(actions.error(format(e, true)))
  }
}

export function* defaultSagaCreateEntity(
  config: CreateEntitySagaConfig,
  action: ReturnType<typeof config.actions.submit>
) {
  const { api, actions, routes } = config
  try {
    const { data } = action.payload
    const entity: ReturnTypeAsync<typeof api> = yield call(api, data)
    yield put(actions.submitted(entity))
    yield put(push(generatePath(routes.list)))
  } catch (e) {
    console.error(`[CRUD-saga:create]\n%o\nAction: %o`, e, action)
    const format: SagaErrorFormatter = yield call(getErrorFormatter)
    yield put(actions.error(format(e, true)))
  }
}

export function* defaultSagaCancelCreateEntityForm(
  config: CancelCreateEntitySagaConfig,
  action: ReturnType<typeof config.actions.cancel>
) {
  const { actions, routes } = config
  yield put(actions.canceled())
  yield put(push(generatePath(routes.list)))
}
//#endregion
