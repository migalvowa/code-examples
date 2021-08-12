import { takeLatest, takeLeading } from "redux-saga/effects";

import { IDefaultEntityPayload, IDefaultEntitySchema } from "@core/core/core";
import { IEntity } from "@core/core/types";

import * as sagas from "./sagas";
import {
  CancelCreateEntitySagaConfig,
  CancelUpdateEntitySagaConfig,
  CreateEntitySagaConfig,
  FetchEntitiesListSagaConfig,
  FetchEntitySagaConfig,
  PrepareCreateEntitySagaConfig,
  PrepareUpdateEntitySagaConfig,
  RemoveEntitiesListSagaConfig,
  RemoveEntitySagaConfig,
  UpdateEntitySagaConfig,
} from "./types";

//#region Single Entity

//#region fetch/remove
export function defaultEffectFetchEntity<T extends IEntity>(
  config: FetchEntitySagaConfig<T>
) {
  return takeLatest(
    config.actions.fetch.type,
    sagas.defaultSagaFetchEntity,
    config
  );
}

export function defaultEffectRemoveEntity<T extends IEntity>(
  config: RemoveEntitySagaConfig<T>
) {
  return takeLeading(
    config.actions.remove.type,
    sagas.defaultSagaRemoveEntity,
    config
  );
}
//#endregion

//#region Forms
//#region create
export function defaultEffectCreateEntity<
  T extends IEntity,
  Payload = IDefaultEntityPayload<T>
>(config: CreateEntitySagaConfig<T, Payload>) {
  return takeLeading(
    config.actions.submit.type,
    sagas.defaultSagaCreateEntity,
    config
  );
}

export function defaultEffectPrepareEntityCreateForm<
  T extends IEntity,
  Schema = IDefaultEntitySchema<T>
>(config: PrepareCreateEntitySagaConfig<T, Schema>) {
  return takeLatest(
    config.actions.prepare.type,
    sagas.defaultSagaPrepareEntityCreateForm,
    config
  );
}

export function defaultEffectCancelEntityCreateForm<T extends IEntity>(
  config: CancelCreateEntitySagaConfig<T>
) {
  return takeLeading(
    config.actions.cancel.type,
    sagas.defaultSagaCancelCreateEntityForm,
    config
  );
}
//#endregion

//#region update
export function defaultEffectUpdateEntity<
  T extends IEntity,
  Payload = IDefaultEntityPayload<T>
>(config: UpdateEntitySagaConfig<T, Payload>) {
  return takeLeading(
    config.actions.submit.type,
    sagas.defaultSagaUpdateEntity,
    config
  );
}

export function defaultEffectPrepareEntityUpdateForm<T extends IEntity>(
  config: PrepareUpdateEntitySagaConfig<T>
) {
  return takeLatest(
    config.actions.prepare.type,
    sagas.defaultSagaPrepareEntityUpdateForm,
    config
  );
}

export function defaultEffectCancelEntityUpdateForm<T extends IEntity>(
  config: CancelUpdateEntitySagaConfig<T>
) {
  return takeLeading(
    config.actions.cancel.type,
    sagas.defaultSagaCancelUpdateEntityForm,
    config
  );
}
//#endregion

//#region Entities List
export function defaultEffectFetchList<T extends IEntity>(
  config: FetchEntitiesListSagaConfig<T>
) {
  return takeLatest(
    config.actions.fetch.type,
    sagas.defaultSagaFetchList,
    config
  );
}

export function defaultEffectRemoveList<T extends IEntity>(
  config: RemoveEntitiesListSagaConfig<T>
) {
  return takeLeading(
    config.actions.remove.type,
    sagas.defaultSagaRemoveList,
    config
  );
}
//#endregion
