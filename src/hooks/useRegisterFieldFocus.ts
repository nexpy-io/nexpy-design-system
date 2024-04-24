/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react'

import { AutoFocusContext } from 'contexts/AutoFocusContext'
import { FieldNextFocusManagerContext } from 'contexts/FieldNextFocusManagerContext'

export const useRegisterFieldFocus = (
  fieldName: string | undefined,
  isDisabled: boolean | undefined
) => {
  const sequentialFieldNamesRef = FieldNextFocusManagerContext.useSelector(
    state => state.sequentialFieldNamesRef
  )
  const renderIndex = FieldNextFocusManagerContext.useSelector(state => state.renderIndex)
  const dispatch = FieldNextFocusManagerContext.useSelector(state => state.dispatch)

  const autoFocusContextValue = AutoFocusContext.useContext()

  const onKeyDown = useCallback(
    (e: any) => {
      if (
        !autoFocusContextValue?.setFocus ||
        !Array.isArray(sequentialFieldNamesRef.current) ||
        isDisabled
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
    [autoFocusContextValue, fieldName, isDisabled, sequentialFieldNamesRef]
  )

  useEffect(() => {
    const clear = () => {
      if (Array.isArray(sequentialFieldNamesRef.current)) {
        sequentialFieldNamesRef.current = sequentialFieldNamesRef.current.filter(
          val => val !== fieldName
        )
      }
    }

    if (isDisabled) {
      return clear
    }

    if (fieldName && autoFocusContextValue?.setFocus) {
      sequentialFieldNamesRef.current.push(fieldName)
    }

    return clear

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocusContextValue?.setFocus, isDisabled, renderIndex])

  useEffect(() => {
    dispatch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabled])

  return onKeyDown
}
