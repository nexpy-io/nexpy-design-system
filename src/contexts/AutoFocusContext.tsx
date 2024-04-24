/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
import { FieldValues, UseFormSetFocus, UseFormTrigger } from 'react-hook-form'

import { createContext } from '@nexpy/react-easy-context-api'

import { WithChildren } from 'types'

type AutoFocusContextValue<FormValues extends FieldValues = any> = {
  trigger: UseFormTrigger<FormValues> | null
  setFocus: UseFormSetFocus<FormValues> | null
}

export const AutoFocusContext = createContext<AutoFocusContextValue>({
  trigger: null,
  setFocus: null,
} as AutoFocusContextValue)

type AutoFocusProviderProps<FormValues extends FieldValues> = WithChildren<{
  trigger: UseFormTrigger<FormValues>
  setFocus: UseFormSetFocus<FormValues>
}>

export const AutoFocus = <FormValues extends FieldValues>({
  children,
  trigger,
  setFocus,
}: AutoFocusProviderProps<FormValues>) => {
  const value = useMemo(
    () => ({
      trigger,
      setFocus,
    }),
    [setFocus, trigger]
  )

  return <AutoFocusContext.Provider value={value}>{children}</AutoFocusContext.Provider>
}
