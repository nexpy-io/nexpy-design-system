/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { MutableRefObject, useCallback, useRef } from 'react'

import VMasker from 'vanilla-masker'

export const useMask = <
  CurrentElement extends HTMLInputElement | null = HTMLInputElement | null
>() => {
  const maskerRef = useRef<ReturnType<typeof VMasker> | null>(null)

  const assignInstance = useCallback((instance: CurrentElement) => {
    if (instance) {
      maskerRef.current = VMasker(instance)
    }
  }, [])

  const ref = useCallback(
    (instance: CurrentElement) => {
      assignInstance(instance)
    },
    [assignInstance]
  )

  const refWrapper = useCallback(
    (
      currentRef:
        | ((instance: CurrentElement) => void)
        | MutableRefObject<CurrentElement>
        | undefined
    ) => {
      if (currentRef && typeof currentRef === 'object') {
        return (instance: CurrentElement) => {
          assignInstance(instance)

          currentRef.current = instance
        }
      }

      if (currentRef && typeof currentRef === 'function') {
        return (instance: CurrentElement) => {
          if (instance) {
            assignInstance(instance)

            currentRef(instance)
          }
        }
      }

      return undefined
    },
    [assignInstance]
  )

  const refWrapperFromObject = useCallback(
    (object: any) => {
      if (typeof object === 'object') {
        const { ref: currentRef, ...rest } = object

        return { ref: refWrapper(currentRef), ...rest }
      }

      return object
    },
    [refWrapper]
  )

  return {
    masker: maskerRef.current,
    connect: { ref, refWrapper, refWrapperFromObject },
  }
}
