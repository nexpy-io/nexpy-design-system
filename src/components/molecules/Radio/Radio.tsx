import React, { forwardRef, useMemo } from 'react'

import { Flex, FlexProps } from 'components/atoms/Flex'
import { Input, InputProps } from 'components/atoms/Input'
import { Label, LabelProps } from 'components/atoms/Label'

import { slugify } from 'utils'

type RadioProps = Omit<InputProps, 'type'> & {
  name: string
  label: string
  value: string | number | readonly string[]

  labelProps?: Omit<LabelProps, 'htmlFor'>
  containerProps?: FlexProps
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, name, value, labelProps, containerProps, ...props }: RadioProps, ref) => {
    const inputId = useMemo(() => slugify(`label-${label}-${name}`), [label, name])

    return (
      <Flex gap='0.8rem' alignItems='center' w='fit-content' {...containerProps}>
        <Input
          h='unset'
          {...props}
          name={name}
          id={inputId}
          ref={ref}
          value={value}
          type='radio'
        />
        <Label {...labelProps} htmlFor={inputId}>
          {label}
        </Label>
      </Flex>
    )
  }
)

Radio.displayName = 'Radio'

Radio.defaultProps = {
  labelProps: undefined,
  containerProps: undefined,
}

export { Radio }
