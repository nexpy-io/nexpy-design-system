import styled, { css } from '@xstyled/styled-components'

import { VariantSystem } from 'types'
import { getVariant } from 'utils'

type ModeVariants = 'default' | 'center' | 'centerScreen' | 'vAlign' | 'hAlign'

type DirectionVariants = 'default' | 'row' | 'column'

export type BoxProps = VariantSystem<ModeVariants, 'div'> & {
  direction?: DirectionVariants
}

const modeVariant = getVariant<BoxProps, ModeVariants>({
  prop: 'variant',
  default: 'default',
  variants: {
    default: css``,
    center: css`
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;
    `,
    centerScreen: css`
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100vw;
      height: 100vh;
    `,
    vAlign: css`
      display: flex;
      align-items: center;
      height: 100%;
    `,
    hAlign: css`
      display: flex;
      justify-content: center;
      width: 100%;
    `,
  },
})

const directionVariant = getVariant<BoxProps, DirectionVariants>({
  prop: 'direction',
  default: 'default',
  variants: {
    default: css``,
    row: css`
      display: flex;
      flex-direction: row;
    `,
    column: css`
      display: flex;
      flex-direction: column;
    `,
  },
})

const Box = styled.divBox<BoxProps>`
  ${modeVariant}
  ${directionVariant}
`

export { Box }
