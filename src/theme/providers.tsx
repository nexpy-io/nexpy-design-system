import React, { useMemo, memo, PropsWithChildren } from 'react'

import { ThemeProvider as BaseThemeProvider } from '@xstyled/styled-components'
import merge from 'lodash/merge'

import { GlobalStyle, defaultTheme } from 'theme/internal'

type ThemeProviderProps = {
  theme?: Record<string, unknown>
}

const ThemeProviderBase = ({
  theme: customTheme,
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  const mergedTheme = useMemo(() => merge({}, defaultTheme, customTheme), [customTheme])

  return (
    <BaseThemeProvider theme={mergedTheme}>
      <GlobalStyle />
      {children}
      <div id='root-design-system-portals' />
    </BaseThemeProvider>
  )
}

ThemeProviderBase.defaultProps = {
  theme: {},
}

const ThemeProvider = memo(ThemeProviderBase)

export { ThemeProvider }
