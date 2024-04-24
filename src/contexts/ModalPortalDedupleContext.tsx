import React, { useMemo } from 'react'

import { createContext } from '@nexpy/react-easy-context-api'

import { WithChildren } from 'types'

type ModalPortalDedupleContextValue = {
  parentModalAlreadyExistsUsingPortal: boolean
}

export const ModalPortalDedupleContext = createContext<ModalPortalDedupleContextValue>({
  parentModalAlreadyExistsUsingPortal: false,
})

export const ModalPortalDedupleProvider = ({ children }: WithChildren) => {
  const value = useMemo(() => ({ parentModalAlreadyExistsUsingPortal: true }), [])

  return (
    <ModalPortalDedupleContext.Provider value={value}>
      {children}
    </ModalPortalDedupleContext.Provider>
  )
}
