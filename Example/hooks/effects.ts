import React from 'react'
import { useSelector } from 'react-redux'

import { EntityDetailsState, EntityFormState } from '../toolkit'
import { IEntity } from '../types'

import { useOnChange } from './changes'

export function useOnMount(fn: React.EffectCallback) {
  // always empty dependencies list, so effect will never ever be executed again
  React.useEffect(fn, [])
}

export function useOnMountLayout(fn: React.EffectCallback) {
  React.useLayoutEffect(fn, [])
}

export function useIsMounted() {
  const [value, setValue] = React.useState(false)
  useOnMountLayout(() => {
    setValue(true)
  })
  return value
}

export function useOnFormSubmitted<T extends IEntity>(
  selector: AppSelector<EntityFormState<T, 'create' | 'update'>>,
  cb: (data: T) => void
) {
  const { submitting, error, response } = useSelector(selector)

  useOnChange(submitting, (submitting, wasSubmitting) => {
    const isSubmittedSuccessfully =
      !submitting && wasSubmitting && error === undefined
    if (isSubmittedSuccessfully) {
      cb(response as T)
    }
  })
}

export function useOnEntityLoaded<T extends IEntity>(
  selector: AppSelector<EntityDetailsState<T>>,
  cb: (data: T) => void
) {
  const { loading, error, data } = useSelector(selector)
  useOnChange(loading, (loading, wasLoading) => {
    const isLoadedSuccessfully = !loading && wasLoading && error === undefined
    if (isLoadedSuccessfully) {
      cb(data as T)
    }
  })
}
