import React from 'react'

import { createContext } from '@nexpy/react-easy-context-api'

import { WithChildren } from 'types'

type ModalPortalDedupleContextValue = {
  parentModalAlreadyExistsUsingPortal: boolean
}

export const ModalPortalDedupleContext = createContext<ModalPortalDedupleContextValue>({
  parentModalAlreadyExistsUsingPortal: false,
})

export const ModalPortalDedupleProvider = ({ children }: WithChildren) => (
  <ModalPortalDedupleContext.Provider
    value={{ parentModalAlreadyExistsUsingPortal: true }}
  >
    {children}
  </ModalPortalDedupleContext.Provider>
)
