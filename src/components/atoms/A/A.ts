import styled from '@xstyled/styled-components'

import { System } from 'types'

export type AProps = System<'a'>

const A = styled.aBox<AProps>`
  cursor: pointer;
`

export { A }
