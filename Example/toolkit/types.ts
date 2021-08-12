import {
  CaseReducer,
  CreateSliceOptions,
  PayloadAction,
} from "@reduxjs/toolkit";

import { IEntity } from "@core/core/types";

// shorthand
type SliceOpts<State> = CreateSliceOptions<State>;
// only allow extra reducers in callback notation, to enforce typescript-compatible definitions
type ExtraReducersBuilder<State> = Extract<
  SliceOpts<State>["extraReducers"],
  Func
>;

export type SimpleSliceCreatorOptions<State> = {
  name: SliceOpts<State>["name"];
  extraReducers?: ExtraReducersBuilder<State>;

  /**
   * Unfortunately, can't support `reducers` param too,
   * because inside slice-factory func that reducer's types
   * can't be properly inferred by TS.
   *
   * That is, you CAN pass more reducers to factory, and it will compile normally –
   * but TS will see them as abstract reducers, with unknown state and unknown action payloads.
   * Which is unacceptable for normal work with project.
   */
};

// Shorthand
export type SimplePayloadReducer<State, Payload> = CaseReducer<
  State,
  PayloadAction<Payload>
>;

type MaybeDict = Dict | undefined;
export type ParentParams = { parentId: IEntity["id"] };

export type MaybeExtend<R extends boolean, Target, Source> = R extends false
  ? Target
  : Target & Source;

export type WithParent<T extends MaybeDict> = T extends undefined
  ? ParentParams
  : MaybeExtend<true, T, ParentParams>;

export type MaybeWithParent<
  IsRelated extends boolean,
  T extends MaybeDict
> = IsRelated extends true ? WithParent<T> : T;
