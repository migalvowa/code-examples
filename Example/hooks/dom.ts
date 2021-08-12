import React from 'react'

import { ResizeSensor } from 'css-element-queries'
import { debounce, throttle } from 'lodash'

import { useChanged } from './changes'

interface IOptions {
  debounce?: number
  throttle?: number
  leading?: boolean
  trailing?: boolean
}

export function useResizeSensor<T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>,
  fn: (node: T, rect: DOMRect) => void,
  options: IOptions = {}
) {
  if (Number(options.debounce) > 0 && Number(options.throttle) > 0) {
    throw new Error(
      'Applying both debounce and throttle to the same function is not allowed'
    )
  }
  const opts: IOptions = useChanged(options)
  React.useLayoutEffect(() => {
    const $node = ref.current
    if ($node === null) {
      return undefined
    }

    // It will be called automatically on initialization too:
    let onResize = () => {
      fn($node, $node.getBoundingClientRect())
    }

    // ---
    const params: IOptions = {}
    if (opts.leading !== undefined) {
      params.leading = opts.leading
    }
    if (opts.trailing !== undefined) {
      params.trailing = opts.trailing
    }
    if (Number(opts.debounce) > 0) {
      onResize = debounce(onResize, opts.debounce, params)
    } else if (Number(opts.throttle) > 0) {
      onResize = throttle(onResize, opts.throttle, params)
    }
    // ---
    const sensor = new ResizeSensor($node, onResize)
    return () => {
      sensor.detach(onResize)
    }
  }, [ref, fn, opts])
}
