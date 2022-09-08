import defaultColors from 'constants/defaultColors.json'

type ColorSystem = {
  [P in keyof typeof defaultColors]: string
}

export const getOverrideSystemColors = (customColors: Partial<ColorSystem>) => ({
  ...defaultColors,
  ...customColors,
})
