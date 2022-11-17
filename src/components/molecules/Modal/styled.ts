import styled from '@xstyled/styled-components'

import { Flex } from 'components/atoms/Flex'
import { Card } from 'components/molecules/Card'

export const ModalBackground = styled(Flex)`
  position: fixed;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: systemTranslucidBlack;
`

export const ModalCard = styled(Card)`
  width: fit-content;

  max-width: 80vw;
`
