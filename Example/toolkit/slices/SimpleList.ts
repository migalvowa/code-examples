import { Slice, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { pullAllWith } from "lodash";

import { IDefaultEntityQuery, IItemsListData } from "@core/core/core";
import { IEntity } from "@core/core/types";

import {
  MaybeWithParent,
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
 * responsible for list data.
 *
 * If it doesn't suit your needs (you need more reducers on it, or more props in it's state)
 * – fall back to using standard `createSlice` directly.
 *
 * You may use separately `createListSliceState` / `createListSliceReducers` helpers
 * to reproduce default list slice behavior in your custom slice.
 */
export function createSimpleListSlice<
  T extends IEntity,
  R extends boolean = false
>(options: SimpleSliceCreatorOptions<EntityListState<T>>) {
  const { name, extraReducers } = options;

  return createSlice({
    name,
    initialState: createEntityListState<T>(),
    reducers: {
      ...createEntityListReducers<T, R>(),
    },
    extraReducers,
  });
}

export function createEntityListState<T extends IEntity>(
  items: T[] = [],
  query: EntityListSliceQuery<T> = undefined
): EntityListState<T> {
  return createAsyncSliceState(
    {
      items,
      total: items.length,
    },
    {
      query,
    }
  );
}

export function createEntityListReducers<
  T extends IEntity,
  R extends boolean = false,
  S extends EntityListState<T> = EntityListState<T>
>(): EntityListReducers<T, R, S> {
  return {
    fetch(state, action) {
      AsyncSliceReducers.request(state);
      const { query } = action.payload;
      state.query = castDraft(query);
    },

    fetched(state, action) {
      AsyncSliceReducers.success(state, castDraft(action));
    },

    remove(state) {
      AsyncSliceReducers.request(state);
    },

    removed(state, action) {
      const ids = action.payload;
      state.loading = false;
      state.data.total -= ids.length;
      pullAllWith(state.data.items, ids, (item, id) => item.id === id);
      AsyncSliceReducers.done(state);
    },

    error(state, action) {
      AsyncSliceReducers.error(state, castDraft(action));
    },
  };
}
//#endregion

//#region types

//#region utils
// Always allow query to be undefined.
// If your API expects some required params, it's up to your api layer to provide them.
export type EntityListSliceQuery<T extends IEntity> =
  | IDefaultEntityQuery<T>
  | undefined;
export type EntityListSliceError<T> = string | undefined;
//#endregion

export type EntityListState<T extends IEntity> = AsyncSliceState<
  IItemsListData<T>,
  {
    Error: EntityListSliceError<T>;
    Fields: {
      query: EntityListSliceQuery<T>;
    };
  }
>;

export interface EntityListReducers<
  T extends IEntity,
  R extends boolean = false,
  S extends EntityListState<T> = EntityListState<T>
> extends SliceCaseReducers<S> {
  // Note that `query` can be undefined, but this field in payload is not optional.
  // Mostly it's just for readability: `fetch({})` reads really bad.
  // It's not that handy to write `fetch({ query: undefined })` instead of `fetch()`,
  // but signature consistency across system is more important.
  fetch: Reducer<S, MaybeWithParent<R, { query: EntityListSliceQuery<T> }>>;
  remove: Reducer<S, MaybeWithParent<R, { ids: T["id"][] }>>;

  fetched: Reducer<S, IItemsListData<T> | undefined>;
  // Require to dispatch removed entity ids,
  // in case someone else want to listen to this action
  removed: Reducer<S, T["id"][]>;

  error: Reducer<S, EntityListSliceError<T>>;
}

export type EntityListSlice<
  T extends IEntity = IEntity,
  R extends boolean = false,
  S extends EntityListState<T> = EntityListState<T>
> = Slice<S, EntityListReducers<T, R, S>>;
//#endregion
