import { flatMap, mapValues } from "lodash";

import { IDefaultEntityPayload, IDefaultEntitySchema } from "@core/core/core";
import { IEntity } from "@core/core/types";

import * as CrudEffects from "./effects";
import {
  DefaultCrudEffectsSetConfig,
  DefaultEntityDetailsEffectsSetConfig,
  DefaultEntityListEffectsSetConfig,
  DefaultFormEffectsSetConfig,
} from "./types";

export function defaultCrudEffectsSet<
  T extends IEntity,
  L extends IEntity = T,
  Schema = IDefaultEntitySchema<T>,
  CreatePayload = IDefaultEntityPayload<T>,
  UpdatePayload = CreatePayload
>(
  config: DefaultCrudEffectsSetConfig<
    T,
    L,
    Schema,
    CreatePayload,
    UpdatePayload
  >
) {
  const { api, routes } = config;

  const dict = {
    list: defaultEntityListEffectsSet<L>({
      api,
      actions: config.list.actions,
      selector: config.list.selector,
    }),

    details: defaultEntityDetailsEffectsSet<T>({
      api,
      routes,
      actions: config.details.actions,
    }),

    formCreate: defaultCreateFormEffectsSet<T, CreatePayload, Schema>({
      api,
      routes,
      actions: config.create.actions,
      selector: config.create.selector,
    }),

    formUpdate: defaultUpdateFormEffectsSet<T, UpdatePayload>({
      api,
      routes,
      actions: config.update.actions,
      selector: config.update.selector,
    }),
  };

  return {
    dict: mapValues(dict, (x) => x.dict),
    list: flatMap(Object.values(dict), (x) => x.list),
  };
}

export function defaultCreateFormEffectsSet<
  T extends IEntity,
  Payload = IDefaultEntityPayload<T>,
  Schema = IDefaultEntitySchema<T>
>(config: DefaultFormEffectsSetConfig<T, "create", Payload, Schema>) {
  const { api, routes, actions } = config;
  const dict = {
    submit: CrudEffects.defaultEffectCreateEntity({
      api: api.create,
      actions,
      routes,
    }),
    prepare: CrudEffects.defaultEffectPrepareEntityCreateForm({
      api: api.getSchema,
      actions,
    }),
    cancel: CrudEffects.defaultEffectCancelEntityCreateForm({
      actions,
      routes,
    }),
  };
  return {
    dict,
    list: Object.values(dict),
  };
}

export function defaultUpdateFormEffectsSet<
  T extends IEntity,
  Payload = IDefaultEntityPayload<T>
>(
  config: DefaultFormEffectsSetConfig<
    T,
    "update",
    Payload,
    // schema doesn't matter, it isn't used in `update` effects
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >
) {
  const { api, routes, actions, selector } = config;
  const dict = {
    submit: CrudEffects.defaultEffectUpdateEntity({
      api: api.update,
      actions,
      routes,
    }),
    prepare: CrudEffects.defaultEffectPrepareEntityUpdateForm({
      api: api.getById,
      actions,
    }),
    cancel: CrudEffects.defaultEffectCancelEntityUpdateForm({
      actions,
      routes,
      selector,
    }),
  };
  return {
    dict,
    list: Object.values(dict),
  };
}

export function defaultEntityDetailsEffectsSet<T extends IEntity>(
  config: DefaultEntityDetailsEffectsSetConfig<T>
) {
  const { api, routes, actions } = config;
  const dict = {
    fetch: CrudEffects.defaultEffectFetchEntity<T>({
      api: api.getById,
      actions,
    }),
    remove: CrudEffects.defaultEffectRemoveEntity<T>({
      api: api.removeOne,
      actions,
      routes,
    }),
  };
  return {
    dict,
    list: Object.values(dict),
  };
}

export function defaultEntityListEffectsSet<T extends IEntity>(
  config: DefaultEntityListEffectsSetConfig<T>
) {
  const { api, actions, selector } = config;
  const dict = {
    fetch: CrudEffects.defaultEffectFetchList<T>({
      api: api.getList,
      actions,
    }),
    remove: CrudEffects.defaultEffectRemoveList<T>({
      api: api.removeMany,
      actions,
      selector,
    }),
  };
  return {
    dict,
    list: Object.values(dict),
  };
}
