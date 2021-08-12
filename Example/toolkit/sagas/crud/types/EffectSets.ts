import {
  ICrudRoutesSet,
  IDefaultEntityPayload,
  IDefaultEntitySchema,
  IEntityCrudAPI,
} from "@core/core/core";
import { IEntity } from "@core/core/types";

import {
  EntityDetailsState,
  EntityFormMode,
  EntityListState,
} from "../../../slices";

import * as ApiMethods from "./ApiMethods";
import { DetailsActions, FormActions, FormState, ListActions } from "./utils";

export interface DefaultCrudEffectsSetConfig<
  T extends IEntity = IEntity,
  L extends IEntity = T,
  Schema = IDefaultEntitySchema<T>,
  CreatePayload = IDefaultEntityPayload<T>,
  UpdatePayload = CreatePayload
> {
  api: IEntityCrudAPI<T, L, Schema, CreatePayload, UpdatePayload>;

  routes: ICrudRoutesSet;

  list: {
    actions: ListActions<L>;
    selector: AppSelector<EntityListState<L>>;
  };
  details: {
    actions: DetailsActions<T>;
    selector: AppSelector<EntityDetailsState<T>>;
  };
  update: {
    actions: FormActions<"update", T, UpdatePayload, Schema>;
    selector: AppSelector<FormState<T, "update", Schema>>;
  };
  create: {
    actions: FormActions<"create", T, CreatePayload, Schema>;
    selector: AppSelector<FormState<T, "create", Schema>>;
  };
}

export interface DefaultFormEffectsSetConfig<
  T extends IEntity,
  M extends EntityFormMode,
  Payload = IDefaultEntityPayload<T>,
  Schema = IDefaultEntitySchema<T>
> {
  api: M extends "create"
    ? {
        getSchema: ApiMethods.APIMethodGetSchema<Schema>;
        create: ApiMethods.APIMethodCreate<T, Payload>;
      }
    : M extends "update"
    ? {
        getById: ApiMethods.APIMethodGetEntity<T>;
        update: ApiMethods.APIMethodUpdate<T, Payload>;
      }
    : never;
  actions: FormActions<M, T, Payload, Schema>;
  selector: AppSelector<FormState<T, M, Schema>>;
  routes: Pick<ICrudRoutesSet, "list" | "details">;
}

export interface DefaultEntityDetailsEffectsSetConfig<T extends IEntity> {
  api: {
    getById: ApiMethods.APIMethodGetEntity<T>;
    removeOne: ApiMethods.APIMethodRemoveOne<T>;
  };
  actions: DetailsActions<T>;
  routes: Pick<ICrudRoutesSet, "list">;
}

export interface DefaultEntityListEffectsSetConfig<T extends IEntity> {
  api: {
    getList: ApiMethods.APIMethodGetList<T>;
    removeMany: ApiMethods.APIMethodRemoveMany<T>;
  };
  actions: ListActions<T>;
  selector: AppSelector<EntityListState<T>>;
}
