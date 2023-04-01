import React, { useMemo } from 'react'

import { createContext } from '@nexpy/react-easy-context-api'

import { StyleModes, WithChildren } from 'types'

type StyleModeContextValue = {
  defaultStyleMode: StyleModes
}

export const StyleModeContext = createContext<StyleModeContextValue>({
  defaultStyleMode: 'default',
})

export const StyleModeProvider = ({
  children,
  defaultStyleMode,
}: WithChildren<Partial<StyleModeContextValue>>) => {
  const contextValue = useMemo(
    () => ({ defaultStyleMode: defaultStyleMode || 'default' }),
    [defaultStyleMode]
  )

  return (
    <StyleModeContext.Provider value={contextValue}>{children}</StyleModeContext.Provider>
  )
}
