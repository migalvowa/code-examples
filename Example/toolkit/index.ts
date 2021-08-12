import { Slice, combineReducers } from '@reduxjs/toolkit'
import { mapValues } from 'lodash'

export * from './slices'
export * from './sagas'
export * from './types'

export function combineSliceReducers<T extends Dict<Slice>>(slices: T) {
  return combineReducers(
    mapValues(slices, x => x.reducer) as {
      [K in keyof T]: T[K]['reducer']
    }
  )
}

export function pickSliceActions<T extends Dict<Slice>>(slices: T) {
  return mapValues(slices, x => x.actions) as {
    [K in keyof T]: T[K]['actions']
  }
}
