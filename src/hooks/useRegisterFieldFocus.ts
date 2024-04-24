/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react'

import { AutoFocusContext } from 'contexts/AutoFocusContext'
import { FieldNextFocusManagerContext } from 'contexts/FieldNextFocusManagerContext'

export const useRegisterFieldFocus = (fieldName?: string | undefined) => {
  const sequentialFieldNamesRef = FieldNextFocusManagerContext.useSelector(
    state => state.sequentialFieldNamesRef
  )

  const autoFocusContextValue = AutoFocusContext.useContext()

  if (fieldName && autoFocusContextValue?.setFocus) {
    sequentialFieldNamesRef.current.push(fieldName)
  }

  const onKeyDown = useCallback(
    (e: any) => {
      if (
        !autoFocusContextValue?.setFocus ||
        !Array.isArray(sequentialFieldNamesRef.current)
      ) {
        return
      }

      if (e.key === 'Enter') {
        e.preventDefault()

        const fieldIndex = sequentialFieldNamesRef.current.findIndex(
          val => val === fieldName
        )

        if (typeof fieldIndex === 'number' && fieldIndex !== -1) {
          const nextFieldNameIndex = fieldIndex + 1
          const nextFieldName = sequentialFieldNamesRef.current[nextFieldNameIndex]

          if (nextFieldName) {
            autoFocusContextValue.trigger?.(fieldName).then(passed => {
              if (passed) {
                autoFocusContextValue.setFocus?.(nextFieldName)
              }
            })
          }
        }
      }
    },
    [autoFocusContextValue, fieldName, sequentialFieldNamesRef]
  )

  useEffect(() => {
    return () => {
      if (!autoFocusContextValue?.setFocus) {
        return
      }

      if (Array.isArray(sequentialFieldNamesRef.current)) {
        sequentialFieldNamesRef.current = sequentialFieldNamesRef.current.filter(
          val => val !== fieldName
        )
      }
    }
  }, [autoFocusContextValue?.setFocus, fieldName, sequentialFieldNamesRef])

  return onKeyDown
}
