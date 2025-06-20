import { PropsWithRef } from 'react'

import { SystemProps } from '@xstyled/styled-components'

import { ElementKey, IntrinsicProps } from './internal'

export type VariantSystem<V, E extends ElementKey> = PropsWithRef<
  {
    variant?: V
  } & SystemProps &
    IntrinsicProps<E>
>

export type System<E extends ElementKey> = PropsWithRef<SystemProps & IntrinsicProps<E>>

export type PropsWithAs<P> = P & {
  as?: ElementKey | undefined
  forwardedAs?: ElementKey | undefined
}

export type StyleModes = 'minimalist' | 'default'
