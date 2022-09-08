import styled, { css } from '@xstyled/styled-components'

import { Box, BoxProps } from 'components/atoms'

import { System } from 'types'
import { getVariant } from 'utils'

type ModeVariants = 'default' | 'primary' | 'secondary'

export type ContainerProps = System<'div'> & {
  paddingMode?: ModeVariants
} & BoxProps

const modeVariant = getVariant<ContainerProps, ModeVariants>({
  prop: 'paddingMode',
  default: 'primary',
  variants: {
    default: css`
      padding: 1.2rem;
    `,
    primary: css`
      padding: 1.8rem;
    `,
    secondary: css`
      padding: 2.4rem;
    `,
  },
})

const Container = styled(Box)<ContainerProps>`
  ${modeVariant}
`

export { Container }
