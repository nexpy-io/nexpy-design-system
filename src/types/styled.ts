import { SystemProps } from '@xstyled/styled-components'

import { ElementKey, IntrinsicProps } from './internal'

export type VariantSystem<V, E extends ElementKey> = {
  variant?: V
} & SystemProps &
  IntrinsicProps<E>

export type System<E extends ElementKey> = SystemProps & IntrinsicProps<E>

export type PropsWithAs<P> = P & {
  as?: ElementKey | undefined
  forwardedAs?: ElementKey | undefined
}
