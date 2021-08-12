import { uniqueId } from 'lodash'

import { EMPTY_GUID, LOCAL_ID_PREFIX } from '../const'
import { IEntity } from '../types'

export function createLocalId() {
  return uniqueId(LOCAL_ID_PREFIX)
}

export function replaceLocalId<T extends IEntity>(entity: T): T {
  return isLocalId(entity.id) ? { ...entity, id: EMPTY_GUID } : entity
}

export function isLocalId(id: IEntity['id']) {
  return id.startsWith(LOCAL_ID_PREFIX)
}
