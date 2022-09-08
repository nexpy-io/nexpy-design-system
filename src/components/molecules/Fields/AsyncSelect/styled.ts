import styled, { css } from '@xstyled/styled-components'

import { Text, TextProps, Box, BoxProps } from 'components/atoms'

type StateProps = {
  isFocused?: boolean
  disabled?: boolean
  error?: string | undefined | null | 'generic_error'
}

type FieldLabelProps = TextProps & StateProps

type InputContainerProps = BoxProps & StateProps

export const SelectContainer = styled(Box)<InputContainerProps>`
  transition: all 0.2s ease;
  border-radius: 0.4rem;
  outline-color: systemLightGrey;
  outline-style: solid;
  outline-width: 1px;
  width: 100%;

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        outline-color: systemFocus;
      }
    `};

  ${({ isFocused }) =>
    isFocused &&
    css`
      outline-color: systemFocus;
      outline-width: 2.8px;
    `};

  ${({ error }) =>
    Boolean(error) &&
    css`
      outline-color: systemDanger;
      outline-width: 2.8px;

      &:hover {
        outline-color: systemDanger;
      }
    `};
`

export const FieldLabel = styled(Text)<FieldLabelProps>`
  transition: all 0.2s ease;
  color: systemBlack;

  ${({ isFocused }) =>
    isFocused &&
    css`
      color: systemFocus;
    `};

  ${({ error }) =>
    Boolean(error) &&
    css`
      color: systemDanger;
    `};
`

export const ErrorLabel = styled(Text)<FieldLabelProps>`
  transition: all 0.2s ease;
  min-height: 2.4rem;
  color: systemDanger;
  opacity: 0;

  ${({ error }) =>
    Boolean(error) &&
    css`
      opacity: 1;
    `};
`
