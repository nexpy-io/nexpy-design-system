import React, { useRef, MutableRefObject, useState, useCallback, useMemo } from 'react'

import { createContext } from '@nexpy/react-easy-context-api'

import { WithChildren } from 'types'

type FieldNextFocusManagerContextValue = {
  sequentialFieldNamesRef: MutableRefObject<string[]>
  renderIndex: number
  dispatch: () => void
}

export const FieldNextFocusManagerContext =
  createContext<FieldNextFocusManagerContextValue>(
    {} as FieldNextFocusManagerContextValue
  )

export const FieldNextFocusManagerProvider = ({ children }: WithChildren) => {
  const [renderIndex, setRenderIndex] = useState<number>(0)

  const sequentialFieldNamesRef = useRef<string[]>([])

  const dispatch = useCallback(() => {
    setRenderIndex(prev => prev + 1)
  }, [])

  const value = useMemo(
    () => ({ sequentialFieldNamesRef, renderIndex, dispatch }),
    [dispatch, renderIndex]
  )

  return (
    <FieldNextFocusManagerContext.Provider value={value}>
      {children}
    </FieldNextFocusManagerContext.Provider>
  )
}
