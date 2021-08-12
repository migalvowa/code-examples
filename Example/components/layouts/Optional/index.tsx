import React from "react";

import { EMPTY_VALUE_PLACEHOLDER } from "@core/core/const";

import { IOptionalLayoutProps } from "./types";

function defaultIsNotEmpty<T>(x: T): x is NonNullable<T> {
  return !(x === null || x === undefined || (x as unknown) === "");
}
const defaultRender = (x: unknown) => x;
const defaultPlaceholder = EMPTY_VALUE_PLACEHOLDER;

export default function Optional<Value>(props: IOptionalLayoutProps<Value>) {
  const {
    children: value,
    isEmpty,
    render = defaultRender,
    empty = defaultPlaceholder,
  } = props;

  if (!defaultIsNotEmpty(value)) {
    return <>{empty}</>;
  }

  if (isEmpty && isEmpty(value)) {
    return <>{empty}</>;
  }

  return <>{render(value)}</>;
}
