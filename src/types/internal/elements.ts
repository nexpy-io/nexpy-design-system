import { ElementType, ComponentPropsWithRef } from 'react'

export type ElementKey = ElementType

export type IntrinsicProps<E extends ElementKey> = ComponentPropsWithRef<E>
