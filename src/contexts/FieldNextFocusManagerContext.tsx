import React, { useRef, MutableRefObject } from 'react'

import { createContext } from '@nexpy/react-easy-context-api'

import { WithChildren } from 'types'

type FieldNextFocusManagerContextValue = {
  sequentialFieldNamesRef: MutableRefObject<string[]>
}

export const FieldNextFocusManagerContext =
  createContext<FieldNextFocusManagerContextValue>(
    {} as FieldNextFocusManagerContextValue
  )

export const FieldNextFocusManagerProvider = ({ children }: WithChildren) => {
  const sequentialFieldNamesRef = useRef<string[]>([])

  return (
    <FieldNextFocusManagerContext.Provider value={{ sequentialFieldNamesRef }}>
      {children}
    </FieldNextFocusManagerContext.Provider>
  )
}
