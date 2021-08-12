import { IDefaultEntitySchema } from "@core/core/core";
import { IEntity } from "@core/core/types";

import {
  EntityDetailsSlice,
  EntityFormMode,
  EntityFormSlice,
  EntityFormState,
  EntityListSlice,
} from "../../../slices";

/* eslint-disable @typescript-eslint/no-explicit-any */

// default crud sagas don't support work with related entities
type SupportRelatedCrud = false;

export type FormActions<
  Mode extends EntityFormMode,
  T extends IEntity,
  Payload,
  Schema
> = EntityFormSlice<
  T,
  Mode,
  /* related */ SupportRelatedCrud,
  Payload,
  Schema,
  /* state */ any // exact state shape doesn't matter, we're looking for action-creators signatures
>["actions"];

//#region action-names
export type ActionNamesFormPrepare = "prepare" | "prepared" | "error";
export type ActionNamesFormSubmit = "submit" | "submitted" | "error";
export type ActionNamesFormCancel = "cancel" | "canceled";
export type ActionNamesFetch = "fetch" | "fetched" | "error";
export type ActionNamesRemove = "remove" | "removed" | "error";
//#endregion

//#region form-actions
export type FormActionsPrepare<
  Mode extends EntityFormMode,
  T extends IEntity,
  Schema
> = Pick<
  FormActions<
    Mode,
    T,
    any /* payload shape doesn't matter for fetching schema */,
    Schema
  >,
  ActionNamesFormPrepare
>;

export type FormActionsSubmit<
  Mode extends EntityFormMode,
  T extends IEntity,
  Payload
> = Pick<
  FormActions<
    Mode,
    T,
    Payload,
    any /* schema shape doesn't matter for submitting payload */
  >,
  ActionNamesFormSubmit
>;

export type FormActionsCancel<
  Mode extends EntityFormMode,
  T extends IEntity
> = Pick<
  FormActions<
    Mode,
    T,
    /* neither payload nor schema don't matter for canceling form */
    any,
    any
  >,
  ActionNamesFormCancel
>;
//#endregion

export type FormState<
  T extends IEntity,
  M extends EntityFormMode,
  Schema = IDefaultEntitySchema<T>
> = EntityFormState<T, M, SupportRelatedCrud, Schema>;

export type ListActions<T extends IEntity> = EntityListSlice<
  T,
  SupportRelatedCrud
>["actions"];
export type DetailsActions<T extends IEntity> = EntityDetailsSlice<
  T,
  SupportRelatedCrud
>["actions"];
