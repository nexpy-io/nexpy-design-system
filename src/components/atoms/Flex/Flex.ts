import styled, { css } from '@xstyled/styled-components'

import { VariantSystem } from 'types'
import { getVariant } from 'utils'

type ModeVariants = 'default' | 'center' | 'centerScreen' | 'vAlign' | 'hAlign'

type DirectionVariants = 'default' | 'row' | 'column'

export type FlexProps = VariantSystem<ModeVariants, 'div'> & {
  direction?: DirectionVariants
}

const modeVariant = getVariant<FlexProps, ModeVariants>({
  prop: 'variant',
  default: 'default',
  variants: {
    default: css``,
    center: css`
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;
    `,
    centerScreen: css`
      justify-content: center;
      align-items: center;

      width: 100vw;
      height: 100vh;
    `,
    vAlign: css`
      align-items: center;
      height: 100%;
    `,
    hAlign: css`
      justify-content: center;
      width: 100%;
    `,
  },
})

const directionVariant = getVariant<FlexProps, DirectionVariants>({
  prop: 'direction',
  default: 'default',
  variants: {
    default: css``,
    row: css`
      flex-direction: row;
    `,
    column: css`
      flex-direction: column;
    `,
  },
})

const Flex = styled.divBox<FlexProps>`
  display: flex;

  ${modeVariant}
  ${directionVariant}
`

export { Flex }
