import React, { useMemo, memo, PropsWithChildren } from 'react'

import { ThemeProvider as BaseThemeProvider } from '@xstyled/styled-components'
import { FieldNextFocusManagerProvider } from 'contexts/FieldNextFocusManagerContext'
import { StyleModeProvider } from 'contexts/StyleModeContext'
import merge from 'lodash/merge'

import { ROOT_DESIGN_SYSTEM_PORTALS_CONTAINER_ID } from 'constants/elements'
import { AdaptativeGlobalStyle, GlobalStyle, defaultTheme } from 'theme/internal'
import { StyleModes } from 'types'

type ThemeProviderProps = {
  theme?: Record<string, unknown>
  disablePortalContainer?: boolean
  defaultStyleMode?: StyleModes
  renderWithAdaptativeRootRemRefCSS?: string
}

const ThemeProviderBase = ({
  theme: customTheme,
  disablePortalContainer,
  defaultStyleMode,
  renderWithAdaptativeRootRemRefCSS,
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  const mergedTheme = useMemo(() => merge({}, defaultTheme, customTheme), [customTheme])

  return (
    <BaseThemeProvider theme={mergedTheme}>
      <StyleModeProvider defaultStyleMode={defaultStyleMode}>
        <FieldNextFocusManagerProvider>
          {renderWithAdaptativeRootRemRefCSS ? (
            <AdaptativeGlobalStyle css={renderWithAdaptativeRootRemRefCSS} />
          ) : (
            <GlobalStyle />
          )}
          {children}

          {disablePortalContainer !== true ? (
            <div id={ROOT_DESIGN_SYSTEM_PORTALS_CONTAINER_ID} />
          ) : null}
        </FieldNextFocusManagerProvider>
      </StyleModeProvider>
    </BaseThemeProvider>
  )
}

ThemeProviderBase.defaultProps = {
  theme: {},
  disablePortalContainer: false,
  defaultStyleMode: undefined,
  renderWithAdaptativeRootRemRefCSS: undefined,
}

const ThemeProvider = memo(ThemeProviderBase)

export { ThemeProvider }
