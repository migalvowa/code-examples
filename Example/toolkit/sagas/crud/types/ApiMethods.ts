import { IEntityCrudAPI } from "@core/core/core";
import { IEntity } from "@core/core/types";

// `any` is widely used here to don't re-define IEntityCrudAPI methods.
// Set `any` for those generics which aren't related to picked method signature.
/* eslint-disable @typescript-eslint/no-explicit-any */

export type APIMethodCreate<T extends IEntity, Payload> = IEntityCrudAPI<
  T,
  any,
  any,
  Payload,
  any
>["create"];

export type APIMethodUpdate<T extends IEntity, Payload> = IEntityCrudAPI<
  T,
  any,
  any,
  any,
  Payload
>["update"];

export type APIMethodGetSchema<Schema> = IEntityCrudAPI<
  any,
  any,
  Schema,
  any,
  any
>["getSchema"];

export type APIMethodGetEntity<T extends IEntity> = IEntityCrudAPI<
  T,
  any,
  any,
  any,
  any
>["getById"];

export type APIMethodGetList<T extends IEntity> = IEntityCrudAPI<
  any,
  T,
  any,
  any,
  any
>["getList"];

export type APIMethodRemoveOne<T extends IEntity> = IEntityCrudAPI<
  T,
  any,
  any,
  any,
  any
>["removeOne"];

export type APIMethodRemoveMany<T extends IEntity> = IEntityCrudAPI<
  T,
  any,
  any,
  any,
  any
>["removeMany"];
