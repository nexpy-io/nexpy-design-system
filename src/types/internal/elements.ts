/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementType, Ref, ComponentProps } from 'react'

export type ElementKey = ElementType

export type IntrinsicProps<E extends ElementKey> = ComponentProps<E> & { ref?: Ref<any> }
