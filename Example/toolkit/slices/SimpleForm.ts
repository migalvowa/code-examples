import { Slice, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { FormikErrors } from "formik";

import { IDefaultEntityPayload, IDefaultEntitySchema } from "@core/core/core";
import { IEntity } from "@core/core/types";

import {
  MaybeExtend,
  MaybeWithParent,
  ParentParams,
  SimplePayloadReducer as Reducer,
  SimpleSliceCreatorOptions,
} from "../types";

import {
  AsyncSliceReducers,
  AsyncSliceState,
  createAsyncSliceState,
} from "./Async";
import { castDraft } from "./utils";

//#region creators
/**
 * This helper provides reasonable defaults for async slices,
 * responsible for entity form operations (create or update).
 *
 * If it doesn't suit your needs (you need more reducers on it, or more props in it's state)
 * – fall back to using standard `createSlice` directly.
 *
 * You may use separately `createEntityFormState` / `createEntityFormReducers` helpers
 * to reproduce default details slice behavior in your custom slice.
 */
export function createSimpleFormSlice<
  T extends IEntity,
  M extends EntityFormMode,
  R extends boolean = false,
  Payload = IDefaultEntityPayload<T>,
  Schema = IDefaultEntitySchema<T>
>(options: SimpleSliceCreatorOptions<EntityFormState<T, M, R, Schema>>) {
  const { name, extraReducers } = options;

  return createSlice({
    name,
    initialState: createEntityFormState<T, M, R, Schema>(),
    reducers: {
      ...createEntityFormReducers<T, M, R, Payload, Schema>(),
    },
    extraReducers,
  });
}

export function createEntityFormState<
  T extends IEntity,
  M extends EntityFormMode,
  R extends boolean = false,
  Schema = IDefaultEntitySchema<T>
>(data?: EntityFormSliceData<T, M, Schema>): EntityFormState<T, M, R, Schema> {
  return createAsyncSliceState(data, {
    submitting: false,
    response: undefined,
  }) as EntityFormState<T, M, R, Schema>;
}

export function createEntityFormReducers<
  T extends IEntity,
  M extends EntityFormMode,
  R extends boolean = false,
  Payload = IDefaultEntityPayload<T>,
  Schema = IDefaultEntitySchema<T>,
  State extends EntityFormState<T, M, R, Schema> = EntityFormState<
    T,
    M,
    R,
    Schema
  >
>(): EntityFormReducers<T, M, R, Payload, Schema, State> {
  return {
    prepare(state, action) {
      AsyncSliceReducers.request(state);

      const { payload } = action;
      if (payload !== undefined && "parentId" in payload) {
        (state as EntityFormState<T, M, true>).parentId = payload.parentId;
      }
    },

    submit(state) {
      state.submitting = true;
    },

    cancel() {}, // noop

    prepared(state, action) {
      AsyncSliceReducers.success(state, castDraft(action));
    },

    submitted(state, action) {
      state.submitting = false;
      state.error = undefined;
      state.response = castDraft(action.payload);
    },

    canceled(state) {
      state.error = undefined;
      (state as EntityFormState<T, M, true>).parentId = undefined;
    },

    error(state, action) {
      AsyncSliceReducers.error(state, castDraft(action));
      state.submitting = false;
    },
  };
}

//#endregion

//#region types

//#region utils
export type EntityFormMode = "create" | "update";

type ByMode<M extends EntityFormMode, Create, Update> = M extends "create"
  ? Create
  : M extends "update"
  ? Update
  : never;

export type EntityFormSliceError<T extends IEntity> =
  | string
  | undefined
  | FormikErrors<T>;

export type EntityFormSliceData<
  T extends IEntity,
  M extends EntityFormMode,
  Schema = IDefaultEntitySchema<T>
> = undefined | ByMode<M, Schema, T>;
//#endregion

export type EntityFormState<
  T extends IEntity,
  M extends EntityFormMode,
  R extends boolean = false,
  Schema = IDefaultEntitySchema<T>
> = AsyncSliceState<
  EntityFormSliceData<T, M, Schema>,
  {
    Error: EntityFormSliceError<T>;
    Fields: MaybeExtend<
      R,
      {
        submitting: boolean;
        response: T | undefined;
      },
      Partial<ParentParams>
    >;
  }
>;

export interface EntityFormReducers<
  T extends IEntity,
  M extends EntityFormMode,
  R extends boolean = false,
  Payload = IDefaultEntityPayload<T>,
  Schema = IDefaultEntitySchema<T>,
  S extends EntityFormState<T, M, R, Schema> = EntityFormState<T, M, R, Schema>
> extends SliceCaseReducers<S> {
  prepare: Reducer<
    S,
    ByMode<
      M,
      MaybeWithParent<R, undefined>,
      MaybeWithParent<R, { id: T["id"] }>
    >
  >;
  submit: Reducer<
    S,
    ByMode<
      M,
      MaybeWithParent<R, { data: Payload }>,
      MaybeWithParent<R, { id: T["id"]; data: Payload }>
    >
  >;

  prepared: Reducer<S, ByMode<M, Schema, T>>;
  submitted: Reducer<S, T>;

  cancel: Reducer<S, undefined>;
  canceled: Reducer<S, undefined>;

  error: Reducer<S, EntityFormSliceError<T>>;
}

export type EntityFormSlice<
  T extends IEntity,
  M extends EntityFormMode,
  R extends boolean = false,
  Payload = IDefaultEntityPayload<T>,
  Schema = IDefaultEntitySchema<T>,
  State extends EntityFormState<T, M, R, Schema> = EntityFormState<
    T,
    M,
    R,
    Schema
  >
> = Slice<State, EntityFormReducers<T, M, R, Payload, Schema, State>>;
//#endregion
