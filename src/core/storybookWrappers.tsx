import React from 'react'

import { Canvas as BaseCanvas, SourceState } from '@storybook/addon-docs'
import { PreviewProps as PurePreviewProps } from '@storybook/components'

import { ThemeProvider } from 'theme'
import { WithChildren } from 'types/react-definitions'

import DarkMode from './DarkMode'

type BaseCanvasProps = PurePreviewProps & {
  withSource?: SourceState
  mdxSource?: string
}

export const Canvas = ({ children, ...props }: WithChildren<BaseCanvasProps>) => (
  <>
    <DarkMode />
    <BaseCanvas {...props}>
      <ThemeProvider>{children}</ThemeProvider>
    </BaseCanvas>
  </>
)
