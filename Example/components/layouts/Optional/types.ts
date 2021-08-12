import { ReactChild } from 'react'

export interface IOptionalLayoutProps<T = unknown> {
  children: T
  isEmpty?: (value: NonNullable<T>) => boolean
  // Require either explicit `null` (for nothing), or something *visible* (for placeholder).
  // ReactNode, allowing undefined or boolean values, isn't acceptable.
  empty?: ReactChild | null
  // For render, strictly require smth visible.
  // Assuming, if you're using such `Optional` layout,
  // you want to actually see something in place of your value.
  render?: (value: NonNullable<T>) => ReactChild
}
