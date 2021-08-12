import {
  ICrudRoutesSet,
  IDefaultEntityPayload,
  IDefaultEntitySchema,
} from "@core/core/core";
import { IEntity } from "@core/core/types";

import { EntityFormState, EntityListState } from "../../../slices";

import * as ApiMethods from "./ApiMethods";
import {
  ActionNamesFetch,
  ActionNamesRemove,
  DetailsActions,
  FormActionsCancel,
  FormActionsPrepare,
  FormActionsSubmit,
  ListActions,
} from "./utils";

/* eslint-disable @typescript-eslint/no-explicit-any */

/*
 * Normally, each of default crud sagas should have generic parameters,
 * and require config with corresponding params.
 *
 * But with that, it's impossible to do indirect calls of such sagas when creating effects.
 * Because in expression `takeLatest(pattern, saga, config)` it's impossible to pass generic params to saga.
 *
 * There is no way to bypass this problem, except of making sagas to accept config of `any` type.
 * Or by casting bound parameters to (still) `any`: like `takeLatest(pattern, saga, config as ConfigType<any>)`.
 */
export type DefaultSagaEntity = any;

//#region single-entity
export interface FetchEntitySagaConfig<T extends IEntity = DefaultSagaEntity> {
  api: ApiMethods.APIMethodGetEntity<T>;
  actions: Pick<DetailsActions<T>, ActionNamesFetch>;
}

export interface RemoveEntitySagaConfig<T extends IEntity = DefaultSagaEntity> {
  api: ApiMethods.APIMethodRemoveOne<T>;
  actions: Pick<DetailsActions<T>, ActionNamesRemove>;
  routes: Pick<ICrudRoutesSet, "list">;
}
//#endregion

//#region form

//#region form-update
export interface PrepareUpdateEntitySagaConfig<
  T extends IEntity = DefaultSagaEntity
> {
  api: ApiMethods.APIMethodGetEntity<T>;
  actions: FormActionsPrepare<"update", T, T>;
}

export interface UpdateEntitySagaConfig<
  T extends IEntity = DefaultSagaEntity,
  Payload = IDefaultEntityPayload<T>
> {
  api: ApiMethods.APIMethodUpdate<T, Payload>;
  actions: FormActionsSubmit<"update", T, Payload>;
  routes: Pick<ICrudRoutesSet, "details">;
}

export interface CancelUpdateEntitySagaConfig<
  T extends IEntity = DefaultSagaEntity
> {
  actions: FormActionsCancel<"update", T>;
  routes: Pick<ICrudRoutesSet, "details">;
  selector: AppSelector<Pick<EntityFormState<T, "update", any>, "data">>;
}

//#endregion

//#region form-create
export interface PrepareCreateEntitySagaConfig<
  T extends IEntity = DefaultSagaEntity,
  Schema = IDefaultEntitySchema<T>
> {
  api: ApiMethods.APIMethodGetSchema<Schema>;
  actions: FormActionsPrepare<"create", T, Schema>;
}

export interface CreateEntitySagaConfig<
  T extends IEntity = DefaultSagaEntity,
  Payload = IDefaultEntityPayload<T>
> {
  api: ApiMethods.APIMethodCreate<T, Payload>;
  actions: FormActionsSubmit<"create", T, Payload>;
  routes: Pick<ICrudRoutesSet, "list">;
}

export interface CancelCreateEntitySagaConfig<
  T extends IEntity = DefaultSagaEntity
> {
  actions: FormActionsCancel<"create", T>;
  routes: Pick<ICrudRoutesSet, "list">;
}
//#endregion
//#endregion

//#region entities-list
export interface FetchEntitiesListSagaConfig<
  T extends IEntity = DefaultSagaEntity
> {
  api: ApiMethods.APIMethodGetList<T>;
  actions: Pick<ListActions<T>, ActionNamesFetch>;
}

export interface RemoveEntitiesListSagaConfig<
  T extends IEntity = DefaultSagaEntity
> {
  api: ApiMethods.APIMethodRemoveMany<T>;
  actions: Pick<ListActions<T>, ActionNamesRemove | "fetch">;
  selector: AppSelector<Pick<EntityListState<T>, "query" | "data">>;
}
//#endregion
