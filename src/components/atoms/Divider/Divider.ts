import styled from '@xstyled/styled-components'

import { System } from 'types'

export type DividerProps = System<'hr'>

const Divider = styled.hrBox<DividerProps>`
  width: 100%;
  height: 0.1rem;
  background-color: systemLightGrey;
  border-radius: 1rem;
  opacity: 0.5;
`

export { Divider }
