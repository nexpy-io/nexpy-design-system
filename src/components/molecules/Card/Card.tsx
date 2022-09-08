/* eslint-disable react/require-default-props */

import React, { forwardRef } from 'react'

import styled, { css } from '@xstyled/styled-components'

import { Box, BoxProps } from 'components/atoms'

import { System } from 'types'
import { getVariant } from 'utils'

type ModeVariants = 'default' | 'primary' | 'secondary'

export type CardProps = System<'div'> & {
  paddingMode?: ModeVariants
} & BoxProps

const defaultPaddingMode = 'primary'

const modeVariant = getVariant<CardProps, ModeVariants>({
  prop: 'paddingMode',
  default: defaultPaddingMode,
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

const CardBase = styled(Box)<CardProps>`
  background-color: systemWhite;

  ${modeVariant}
`

const Card = forwardRef<HTMLDivElement, CardProps>(({ children, ...props }, ref) => (
  <CardBase ref={ref} boxShadow='xl' borderRadius='lg' {...props}>
    {children}
  </CardBase>
))

Card.displayName = 'Card'

export { Card }
