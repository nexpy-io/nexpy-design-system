import { PropsWithAs } from 'types'
import { VariantValue } from 'types/internal'

type GetVariant<P, V extends string> = {
  prop: keyof P
  default: V | ((props: PropsWithAs<P>) => V)
  variants: Record<V, VariantValue<P>>
}

export const getVariant =
  <P, V extends string>({
    prop,
    default: defaultVariantName,
    variants,
  }: GetVariant<P, V>) =>
  (props: P) => {
    let defaultVariant: VariantValue<P>

    if (typeof defaultVariantName === 'function') {
      defaultVariant = variants[defaultVariantName(props as PropsWithAs<P>)]
    } else {
      defaultVariant = variants[defaultVariantName]
    }

    if (!defaultVariant) {
      throw new Error(
        `[Design System] Variant Util: default variant in 'variants' not found with this key: '${defaultVariantName}'`
      )
    }

    const currentVariantIdentifier = String(props[prop]) as V
    const resolvedVariant = variants[currentVariantIdentifier]

    if (!resolvedVariant) {
      return defaultVariant
    }

    if (typeof resolvedVariant === 'function') {
      return resolvedVariant(props)
    }

    return resolvedVariant
  }
