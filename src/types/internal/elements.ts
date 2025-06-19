import { ElementType, PropsWithRef, ComponentProps } from 'react'

export type ElementKey = ElementType

export type IntrinsicProps<E extends ElementKey> = PropsWithRef<ComponentProps<E>>
