import React, { useCallback, useEffect, useState } from 'react'

import { enable, disable } from 'darkreader'

const themeStorageName = 'design-system-theme-mode'

const DarkMode = () => {
  const [isDarkModeActive, setIsDarkModeActive] = useState<boolean>(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        if (localStorage.getItem(themeStorageName) === 'dark') {
          return true
        }
      }
    } catch {
      // do nothing
    }

    return false
  })

  const handleEnable = useCallback(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(themeStorageName, 'dark')
      }
    } catch {
      // do nothing
    }

    setIsDarkModeActive(true)
  }, [])

  const handleDisable = useCallback(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(themeStorageName, 'default')
      }
    } catch {
      // do nothing
    }

    setIsDarkModeActive(false)
  }, [])

  useEffect(() => {
    if (isDarkModeActive) {
      enable({
        brightness: 100,
        contrast: 100,
        sepia: 0,
      })
    } else {
      disable()
    }
  }, [isDarkModeActive])

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        if (typeof localStorage !== 'undefined') {
          if (localStorage.getItem(themeStorageName) === 'dark') {
            setIsDarkModeActive(true)
          } else {
            setIsDarkModeActive(false)
          }
        }
      } catch {
        // do nothing
      }
    }, 200)

    return () => {
      clearInterval(interval)
    }
  }, [isDarkModeActive])

  if (isDarkModeActive) {
    return (
      <button type='button' onClick={handleDisable}>
        Disable dark mode in render
      </button>
    )
  }

  return (
    <button type='button' onClick={handleEnable}>
      Enable dark mode in render
    </button>
  )
}

export default DarkMode
