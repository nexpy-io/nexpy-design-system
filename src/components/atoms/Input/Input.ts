import styled from '@xstyled/styled-components'

import { System } from 'types'

export type InputProps = System<'input'>

const Input = styled.inputBox<InputProps>`
  height: 4.6rem;
  outline: none;
  border: none;
  font-size: default;
  font-weight: normal;

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    font-size: default;
    font-weight: normal;
  }

  &:focus-visible {
    outline-width: 1px !important;
    outline-style: solid !important;
    outline-color: systemPrimary !important;
  }
`

export { Input }
