import styled, { css } from '@xstyled/styled-components'

import { VariantSystem } from 'types'
import { getVariant } from 'utils'

type ModeVariants = 'contained' | 'outlined' | 'ghost'
type SizeVariants = 'content' | 'auto' | 'small' | 'medium' | 'large'
type ColorModeVariants = 'default' | 'danger' | 'warning' | 'safe'

export type ButtonProps = VariantSystem<ModeVariants, 'button'> & {
  size?: SizeVariants
  colorMode?: ColorModeVariants
}

const modeVariant = getVariant<ButtonProps, ModeVariants>({
  prop: 'variant',
  default: 'contained',
  variants: {
    contained: css`
      border: none;
    `,
    outlined: css`
      border: 0.1rem solid;
    `,
    ghost: css`
      border: none;
      padding: 0;
      border-radius: unset;
      text-transform: unset;
      display: inline-flex;
      box-shadow: none;
      min-width: unset;
      min-height: unset;
      width: fit-content;
      height: fit-content;
      font-weight: initial;

      &:hover {
        box-shadow: none;
      }

      &:active {
        transform: none;
        box-shadow: none;
      }
    `,
  },
})

const sizeVariant = getVariant<ButtonProps, SizeVariants>({
  prop: 'size',
  default: 'content',
  variants: {
    content: css`
      min-width: unset;

      width: fit-content;
    `,
    auto: css`
      min-width: unset;

      width: 100%;
    `,
    small: css`
      width: 8rem;
    `,
    medium: css`
      width: 12rem;
    `,
    large: css`
      min-height: 5.5rem;

      width: 24rem;
    `,
  },
})

const colorModeVariant = getVariant<ButtonProps, ColorModeVariants>({
  prop: 'colorMode',
  default: 'default',
  variants: {
    default: ({ variant }) => {
      switch (variant) {
        case 'contained':
          return css`
            background-color: systemPrimary;
            color: systemWhite;
          `

        case 'outlined':
          return css`
            background-color: systemWhite;
            border-color: systemPrimary;
            color: systemPrimary;
          `

        case 'ghost':
          return css`
            background-color: transparent;
          `

        default:
          return css`
            background-color: systemPrimary;
            color: systemWhite;
          `
      }
    },
    danger: ({ variant }) => {
      switch (variant) {
        case 'contained':
          return css`
            background-color: systemDanger;
            color: systemWhite;
          `

        case 'outlined':
          return css`
            background-color: systemWhite;
            border-color: systemDanger;
            color: systemDanger;
          `

        case 'ghost':
          return css`
            background-color: transparent;
          `

        default:
          return css`
            background-color: systemDanger;
            color: systemWhite;
          `
      }
    },
    warning: ({ variant }) => {
      switch (variant) {
        case 'contained':
          return css`
            background-color: systemWarning;
            color: systemWhite;
          `

        case 'outlined':
          return css`
            background-color: systemWhite;
            border-color: systemWarning;
            color: systemWarning;
          `

        case 'ghost':
          return css`
            background-color: transparent;
          `

        default:
          return css`
            background-color: systemWarning;
            color: systemWhite;
          `
      }
    },
    safe: ({ variant }) => {
      switch (variant) {
        case 'contained':
          return css`
            background-color: systemSafe;
            color: systemWhite;
          `

        case 'outlined':
          return css`
            background-color: systemWhite;
            border-color: systemSafe;
            color: systemSafe;
          `

        case 'ghost':
          return css`
            background-color: transparent;
          `

        default:
          return css`
            background-color: systemSafe;
            color: systemWhite;
          `
      }
    },
  },
})

const disabledStyleResolver = ({ disabled, variant }: ButtonProps) => {
  if (disabled) {
    switch (variant) {
      case 'contained':
        return css`
          background-color: systemDisabled;
          color: systemWhite;

          &:hover,
          &:active {
            box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 8px -4px,
              rgba(0, 0, 0, 0.02) 0px 12px 17px 2px;
          }
        `

      case 'outlined':
        return css`
          background-color: systemWhite;
          border-color: systemDisabled;
          color: systemDisabled;

          &:hover,
          &:active {
            box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 8px -4px,
              rgba(0, 0, 0, 0.02) 0px 12px 17px 2px;
          }
        `

      case 'ghost':
        return css`
          background-color: transparent;
          box-shadow: none;

          &:hover,
          &:active {
            box-shadow: none;
          }
        `

      default:
        return css`
          background-color: #e5e5e5;
          border-color: #e5e5e5;
          color: #fff;

          &:hover,
          &:active {
            box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 8px -4px,
              rgba(0, 0, 0, 0.02) 0px 12px 17px 2px;
          }
        `
    }
  }

  return css``
}

const Button = styled.buttonBox.attrs<ButtonProps>(props => ({
  type: props.type || 'button',
}))<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;

  box-sizing: border-box;

  min-width: 6.4rem;
  min-height: 3.65rem;
  height: fit-content;
  padding: 0.6rem 1.6rem;
  border-radius: 0.4rem;

  outline: none;
  appearance: none;
  user-select: none;

  font-weight: medium;
  font-size: sm;
  text-transform: uppercase;

  -webkit-tap-highlight-color: transparent;
  -webkit-box-align: center;
  -webkit-box-pack: center;

  transition: all 0.2s ease;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 8px -4px, rgba(0, 0, 0, 0.02) 0px 12px 17px 2px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 8px -4px, rgba(0, 0, 0, 0.08) 0px 12px 17px 2px;
  }

  &:focus-visible {
    outline-width: 1px !important;
    outline-style: solid !important;
    outline-color: systemPrimary !important;
  }

  &:active {
    transform: scale(0.98);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px,
      rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
  }

  ${sizeVariant}
  ${modeVariant}
  ${colorModeVariant}
  ${disabledStyleResolver}
`

export { Button }
