/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { useCallback, useMemo } from 'react'

import VMasker from 'vanilla-masker'

export const useMask = (customPattern: string) => {
  const pattern = useMemo(() => customPattern, [customPattern])

  const ref = useCallback(
    (instance: any) => {
      VMasker(instance).maskPattern(pattern)
    },
    [pattern]
  )

  const refWrapper = useCallback(
    (currentRef: any) => {
      if (currentRef && typeof currentRef === 'object') {
        return (instance: any) => {
          currentRef.current = instance
        }
      }

      if (currentRef && typeof currentRef === 'function') {
        return (instance: any) => {
          if (instance) {
            VMasker(instance).maskPattern(pattern)

            currentRef(instance)
          }
        }
      }

      return undefined
    },
    [pattern]
  )

  const refWrapperFromObject = useCallback(
    (object: any) => {
      const { ref: currentRef, ...rest } = object

      return { ref: refWrapper(ref), ...rest }
    },
    [ref, refWrapper]
  )

  return {
    ref,
    refWrapper,
    refWrapperFromObject,
  }
}
