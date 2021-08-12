import qs from 'qs'

import { ISelectOption, ITitledEntity } from '../types'

export { shallowEqual } from 'react-redux'

export function assert<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`)
  }
}

export function parseQueryString(string: string) {
  return qs.parse(string, { ignoreQueryPrefix: true })
}

export function dictOf<T, K extends string = string>(
  value: T,
  keys: K[]
): Record<K, T> {
  return keys.reduce((acc, k) => {
    acc[k] = value
    return acc
  }, {} as Record<K, T>)
}

export function createSelectOptions<T extends ITitledEntity>(
  options: T[]
): ISelectOption[] {
  return options.map(({ title, id }) => ({
    title,
    id,
  }))
}

export function normalizeUrl(url: string) {
  return /^https?:\/\//.test(url) ? url : `http://${url.trim()}`
}
