import styled, { css } from '@xstyled/styled-components'

import { Text, TextProps, Box, BoxProps } from 'components/atoms'

import { StyleModes } from 'types'
import { getVariant } from 'utils'

type StateProps = {
  isFocused?: boolean
  disabled?: boolean
  error?: string | undefined | null | 'generic_error'
  styleMode?: StyleModes
}

type FieldLabelProps = TextProps & StateProps

type SelectContainerProps = BoxProps & StateProps

type Placeholder = {
  placeholderId: string
}

const containerStyleModeVariant = getVariant<
  SelectContainerProps & Placeholder,
  StyleModes
>({
  prop: 'styleMode',
  default: 'default',
  variants: {
    default: css``,
    minimalist: ({ isFocused, error, placeholderId }) => css`
      outline: none !important;
      border-radius: none !important;

      border-bottom-width: 1px;
      border-bottom-color: systemPrimary;

      input {
        padding: 0.25em 0.375em 0.2em 0em;
        height: 4rem;
      }

      #${placeholderId} {
        transition: unset;

        opacity: 0;
      }

      ${isFocused &&
      css`
        border-bottom-color: systemFocus;

        #${placeholderId} {
          transition: all 0.2s ease 0.1s;
          opacity: 0.6;
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
      top: 1.5rem;

      z-index: 2;
      position: absolute;

      ${isFocused &&
      css`
        top: -1.6rem !important;
        font-size: 1.2rem !important;
        opacity: 1 !important;
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

const rootStyleModeVariant = getVariant<SelectContainerProps & Placeholder, StyleModes>({
  prop: 'styleMode',
  default: 'default',
  variants: {
    default: css``,
    minimalist: ({ placeholderId }) => css`
      &:not(:has(#${placeholderId})) {
        label {
          top: -1.6rem;
          opacity: 0.8;
          font-size: 1.2rem;
        }
      }
    `,
  },
})

export const SelectContainer = styled(Box)<SelectContainerProps & Placeholder>`
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

  ${containerStyleModeVariant}
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

export const RootContainer = styled(Box)<StateProps & Placeholder>`
  position: relative;

  ${rootStyleModeVariant}
`
