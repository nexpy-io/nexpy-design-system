import React, { useMemo, memo, PropsWithChildren } from 'react'

import { css, ThemeProvider as BaseThemeProvider } from '@xstyled/styled-components'
import { StyleModeProvider } from 'contexts/StyleModeContext'
import merge from 'lodash/merge'

import { ROOT_DESIGN_SYSTEM_PORTALS_CONTAINER_ID } from 'constants/elements'
import { AdaptativeGlobalStyle, GlobalStyle, defaultTheme } from 'theme/internal'
import { StyleModes } from 'types'

type ThemeProviderProps = {
  theme?: Record<string, unknown>
  disablePortalContainer?: boolean
  defaultStyleMode?: StyleModes
  useAdatpativeLayout?: ReturnType<typeof css>
}

const ThemeProviderBase = ({
  theme: customTheme,
  disablePortalContainer,
  defaultStyleMode,
  useAdatpativeLayout,
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  const mergedTheme = useMemo(() => merge({}, defaultTheme, customTheme), [customTheme])

  return (
    <BaseThemeProvider theme={mergedTheme}>
      <StyleModeProvider defaultStyleMode={defaultStyleMode}>
        {useAdatpativeLayout ? (
          <AdaptativeGlobalStyle cssResult={useAdatpativeLayout} />
        ) : (
          <GlobalStyle />
        )}
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
  useAdatpativeLayout: undefined,
}

const ThemeProvider = memo(ThemeProviderBase)

export { ThemeProvider }
