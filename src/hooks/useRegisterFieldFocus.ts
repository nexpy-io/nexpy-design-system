/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react'

import { AutoFocusContext } from 'contexts/AutoFocusContext'
import { FieldNextFocusManagerContext } from 'contexts/FieldNextFocusManagerContext'

export const useRegisterFieldFocus = (fieldName?: string | undefined) => {
  const sequentialFieldNamesRef = FieldNextFocusManagerContext.useSelector(
    state => state.sequentialFieldNamesRef
  )

  useEffect(() => {
    const t = setInterval(() => {
      console.log(sequentialFieldNamesRef.current)
    }, 1000)

    return () => {
      clearInterval(t)
    }
  }, [sequentialFieldNamesRef])

  const autoFocusContextValue = AutoFocusContext.useContext()

  if (fieldName && autoFocusContextValue?.setFocus) {
    sequentialFieldNamesRef.current.push(fieldName)
  }

  const onKeyDown = useCallback(
    (e: any) => {
      console.log('autoFocusContextValue', autoFocusContextValue)
      console.log('sequentialFieldNamesRef', sequentialFieldNamesRef)

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

        console.log('fieldIndex', fieldIndex)

        if (typeof fieldIndex === 'number' && fieldIndex !== -1) {
          const nextFieldNameIndex = fieldIndex + 1
          const nextFieldName = sequentialFieldNamesRef.current[nextFieldNameIndex]

          console.log('nextFieldName', nextFieldName)

          if (nextFieldName) {
            autoFocusContextValue.trigger?.(fieldName).then(passed => {
              if (passed) {
                console.log('called')

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
