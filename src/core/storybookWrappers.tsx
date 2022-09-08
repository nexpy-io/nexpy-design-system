import React from 'react'

import { Canvas as BaseCanvas, SourceState } from '@storybook/addon-docs'
import { PreviewProps as PurePreviewProps } from '@storybook/components'

import { ThemeProvider } from 'theme'
import { WithChildren } from 'types/react-definitions'

type BaseCanvasProps = PurePreviewProps & {
  withSource?: SourceState
  mdxSource?: string
}

export const Canvas = ({ children, ...props }: WithChildren<BaseCanvasProps>) => (
  <BaseCanvas {...props}>
    <ThemeProvider>{children}</ThemeProvider>
  </BaseCanvas>
)
