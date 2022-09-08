import { FlattenSimpleInterpolation } from 'styled-components'

export type VariantValue<P> =
  | FlattenSimpleInterpolation
  | ((props: P) => FlattenSimpleInterpolation)
