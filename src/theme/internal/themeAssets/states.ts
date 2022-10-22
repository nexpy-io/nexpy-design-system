const states = {
  _: null,
  motionSafe: '@media (prefers-reduced-motion: no-preference)',
  motionReduce: '@media (prefers-reduced-motion: reduce)',
  first: '&:first-child',
  last: '&:last-child',
  odd: '&:odd',
  even: '&:even',
  visited: '&:visited',
  checked: '&:checked',
  focusWithin: '&:focus-within',
  hover: '&:hover',
  focus: '&:focus',
  focusVisible: '&:focus-visible',
  active: '&:active',
  disabled: '&:disabled, &[aria-disabled=true]',
  placeholder: '&::placeholder',
}

export default states
