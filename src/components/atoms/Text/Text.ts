import styled, { css } from '@xstyled/styled-components'

import { VariantSystem } from 'types'
import { getVariant } from 'utils'

type TextVariants = 'heading' | 'subheading' | 'body' | 'caption'

export type TextProps = VariantSystem<TextVariants, 'p'>

const textVariant = getVariant<TextProps, TextVariants>({
  prop: 'variant',
  default: props => {
    switch (props.as) {
      case 'h1':
        return 'heading'

      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return 'subheading'

      default:
        return 'body'
    }
  },
  variants: {
    heading: css`
      font-weight: medium;
      font-size: lg;

      @media (min-width: sm) {
        font-size: 2xl;
      }
    `,
    subheading: css`
      font-size: default;

      @media (min-width: sm) {
        font-size: xl;
      }
    `,
    body: css`
      font-size: sm;

      @media (min-width: sm) {
        font-size: default;
      }
    `,
    caption: css`
      font-size: xs;
    `,
  },
})

const Text = styled.pBox<TextProps>`
  font-weight: normal;

  color: systemText;

  ${textVariant}
`

export { Text }
