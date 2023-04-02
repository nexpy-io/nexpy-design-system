import styled, { css } from '@xstyled/styled-components'

import { Text, TextProps, Box, BoxProps, Span, SpanProps } from 'components/atoms'

import { StyleModes } from 'types'
import { getVariant } from 'utils'

type StateProps = {
  isFocused?: boolean
  disabled?: boolean
  error?: string | undefined | null | 'generic_error'
  styleMode?: StyleModes
}

type FieldLabelProps = TextProps &
  StateProps & {
    type?: string
  }

type InputContainerProps = BoxProps & StateProps

type FileInputSpanButtonProps = SpanProps & StateProps

const rootStyleModeVariant = getVariant<InputContainerProps, StyleModes>({
  prop: 'styleMode',
  default: 'default',
  variants: {
    default: css``,
    minimalist: css`
      &:has(input:not(:placeholder-shown)) {
        label {
          top: -1.6rem;
          opacity: 0.8;
          font-size: 1.2rem;
        }
      }
    `,
  },
})

const containerStyleModeVariant = getVariant<InputContainerProps, StyleModes>({
  prop: 'styleMode',
  default: 'default',
  variants: {
    default: css``,
    minimalist: ({ isFocused, error }) => css`
      outline: none !important;
      border-radius: none !important;

      border-bottom-width: 1px;
      border-bottom-color: systemPrimary;

      input {
        padding: 0.25em 0.375em 0.2em 0em;
        height: 4rem;
      }

      input::placeholder {
        transition: unset;

        opacity: 0;
      }

      ${isFocused &&
      css`
        border-bottom-color: systemFocus;

        input::placeholder {
          transition: all 0.2s ease 0.1s;
          opacity: 0.4;
        }
      `}

      ${Boolean(error) &&
      css`
        border-bottom-color: systemDanger;
      `};
    `,
  },
})

const labelStyleModeVariant = getVariant<FieldLabelProps, StyleModes>({
  prop: 'styleMode',
  default: 'default',
  variants: {
    default: css``,
    minimalist: ({ isFocused, error }) => css`
      pointer-events: none;
      opacity: 0.5;

      position: absolute;
      top: 0.8rem;

      ${isFocused &&
      css`
        top: -1.6rem;
        font-size: 1.2rem;
        opacity: 1;
      `}

      ${error &&
      css`
        opacity: 0.8;
        top: -1.6rem;
        font-size: 1.2rem;
      `}
    `,
  },
})

const fileButtonStyleModeVariant = getVariant<FileInputSpanButtonProps, StyleModes>({
  prop: 'styleMode',
  default: 'default',
  variants: {
    default: css``,
    minimalist: css`
      opacity: 0.8;
      margin-left: 0;
      border-radius: 0.4rem;
      background-color: systemPrimary;
      color: systemWhite;
      font-size: 1.2rem;
    `,
  },
})

export const RootContainer = styled(Box)<StateProps>`
  position: relative;

  ${rootStyleModeVariant}
`

export const MinimalistBorderHelper = styled(Box)<StateProps>`
  transition: all 0.2s ease;

  opacity: 0;
  border-bottom-width: 1px;
  border-bottom-color: systemPrimary;

  ${({ isFocused }) =>
    isFocused &&
    css`
      opacity: 1;
      border-bottom-color: systemFocus;
    `}

  ${({ error }) =>
    Boolean(error) &&
    css`
      opacity: 1;
      border-bottom-color: systemDanger;
    `};
`

export const InputContainer = styled(Box)<InputContainerProps>`
  transition: all 0.2s ease;
  border-radius: 0.4rem;
  outline-color: systemLightGrey;
  outline-style: solid;
  outline-width: 1px;
  width: 100%;

  display: flex;
  align-items: center;

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

  ${containerStyleModeVariant}
`

export const FieldLabel = styled(Text)<FieldLabelProps>`
  transition: all 0.2s ease;
  color: systemBlack;
  font-size: 1.4rem;

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

  ${labelStyleModeVariant}
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

export const FileInputSpanButton = styled(Span)<FileInputSpanButtonProps>`
  cursor: pointer;

  width: fit-content;
  white-space: nowrap;

  padding: 0.4rem;
  border-width: 1px;
  border-style: solid;
  border-color: systemTranslucidBlack;
  border-radius: 0.4rem;
  margin-right: 0.4rem;
  margin-left: 0.4rem;

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        border-color: systemFocus;
      }
    `};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: systemFocus;
    `};

  ${({ error }) =>
    Boolean(error) &&
    css`
      border-color: systemDanger;

      &:hover {
        border-color: systemDanger;
      }
    `};

  ${fileButtonStyleModeVariant}
`
