import { createGlobalStyle } from '@xstyled/styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 50%;
  }

  @media (min-width: sm) {
    :root {
      font-size: 62.5%;
    }
  }
`

export const AdaptativeGlobalStyle = createGlobalStyle<{
  css: string
}>`
  :root {
    font-size: 50%;
  }

  @media (min-width: 2xl) {
    :root {
      font-size: 62.5%;
    }
  }

  ${({ css }) => css}
`
