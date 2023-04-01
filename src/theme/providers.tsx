import React, { useMemo, memo, PropsWithChildren } from 'react'

import { ThemeProvider as BaseThemeProvider } from '@xstyled/styled-components'
import { StyleModeProvider } from 'contexts/StyleModeContext'
import merge from 'lodash/merge'

import { ROOT_DESIGN_SYSTEM_PORTALS_CONTAINER_ID } from 'constants/elements'
import { GlobalStyle, defaultTheme } from 'theme/internal'
import { StyleModes } from 'types'

type ThemeProviderProps = {
  theme?: Record<string, unknown>
  disablePortalContainer?: boolean
  defaultStyleMode?: StyleModes
}

const ThemeProviderBase = ({
  theme: customTheme,
  disablePortalContainer,
  defaultStyleMode,
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  const mergedTheme = useMemo(() => merge({}, defaultTheme, customTheme), [customTheme])

  return (
    <BaseThemeProvider theme={mergedTheme}>
      <StyleModeProvider defaultStyleMode={defaultStyleMode}>
        <GlobalStyle />
        {children}

        {disablePortalContainer !== true ? (
          <div id={ROOT_DESIGN_SYSTEM_PORTALS_CONTAINER_ID} />
        ) : null}
      </StyleModeProvider>
    </BaseThemeProvider>
  )
}

ThemeProviderBase.defaultProps = {
  theme: {},
  disablePortalContainer: false,
  defaultStyleMode: undefined,
}

const ThemeProvider = memo(ThemeProviderBase)

export { ThemeProvider }
