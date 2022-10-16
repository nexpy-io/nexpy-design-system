import React, { useMemo, memo, PropsWithChildren } from 'react'

import { ThemeProvider as BaseThemeProvider } from '@xstyled/styled-components'
import merge from 'lodash/merge'

import { ROOT_DESIGN_SYSTEM_PORTALS_CONTAINER_ID } from 'constants/elements'
import { GlobalStyle, defaultTheme } from 'theme/internal'

type ThemeProviderProps = {
  theme?: Record<string, unknown>
  disablePortalContainer?: boolean
}

const ThemeProviderBase = ({
  theme: customTheme,
  disablePortalContainer,
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  const mergedTheme = useMemo(() => merge({}, defaultTheme, customTheme), [customTheme])

  return (
    <BaseThemeProvider theme={mergedTheme}>
      <GlobalStyle />
      {children}

      {disablePortalContainer !== true ? (
        <div id={ROOT_DESIGN_SYSTEM_PORTALS_CONTAINER_ID} />
      ) : null}
    </BaseThemeProvider>
  )
}

ThemeProviderBase.defaultProps = {
  theme: {},
  disablePortalContainer: false,
}

const ThemeProvider = memo(ThemeProviderBase)

export { ThemeProvider }
