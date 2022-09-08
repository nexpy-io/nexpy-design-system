/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo, useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import ReactSelect from 'react-select'

import { Box } from 'components/atoms'

import { System } from 'types'
import { slugify } from 'utils'

import { SelectContainer, FieldLabel, ErrorLabel } from './styled'

export type SelectOption = Record<string, any>

export type SelectProps<FormType extends FieldValues> = {
  error?: string | undefined | null | 'generic_error'
  enableSearch?: {
    noOptionsMessage: string
  }
  isMulti?: boolean
  isClearable?: boolean

  name: Path<FormType>
  label: string
  options: Array<SelectOption>
  placeholder?: string

  control: Control<FormType>
} & Omit<System<'input'>, 'autoComplete'>

const Select = <FormType extends FieldValues>(props: SelectProps<FormType>) => {
  const {
    options,
    control,
    label,
    error,
    isMulti,
    enableSearch,
    isClearable,
    disabled,
    defaultValue,
    name,
    required,
    placeholder,
    ...rest
  } = props

  const [isFocused, setIsFocused] = useState<boolean>(false)

  // TODO: Aprimorar a estilização a partir do tema
  const customSelectStyles = useMemo(
    () => ({
      control: (provided: any) => ({
        ...provided,
        width: '100%',
        height: '4.6rem',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        cursor: 'pointer',
        ...(isMulti && {
          height: 'unset',
          minHeight: '4.6rem',
        }),
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#2957a4' : 'transparent',
      }),
    }),
    [isMulti]
  )

  return (
    <Box m='0.8rem 0' display='inline-block' w='fit-content' {...rest}>
      <FieldLabel
        as='label'
        variant='caption'
        mb='0.4rem'
        isFocused={isFocused}
        error={error}
        htmlFor={`field-${name}`}
      >
        {label}
      </FieldLabel>
      <SelectContainer error={error} isFocused={isFocused} disabled={disabled}>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onBlur, onChange } }) => {
            if (isMulti) {
              return (
                <ReactSelect<SelectOption, true>
                  id={slugify(`select-${label}`)}
                  styles={customSelectStyles}
                  options={options}
                  placeholder={placeholder === undefined ? label : placeholder}
                  isMulti={isMulti}
                  onChange={selectedOptions => {
                    onChange(selectedOptions)
                  }}
                  onBlur={() => {
                    onBlur()
                    setIsFocused(false)
                  }}
                  onFocus={() => setIsFocused(true)}
                  value={value}
                  defaultValue={value}
                  isClearable={isClearable}
                  aria-label={label}
                  isDisabled={disabled}
                  data-cy={slugify(`select-${label}`)}
                  isSearchable={Boolean(enableSearch)}
                  noOptionsMessage={() => enableSearch?.noOptionsMessage}
                />
              )
            }

            return (
              <ReactSelect
                id={slugify(`select-${label}`)}
                styles={customSelectStyles}
                options={options}
                placeholder={placeholder === undefined ? label : placeholder}
                onChange={selectedOption => onChange(selectedOption?.value || null)}
                onBlur={() => {
                  onBlur()
                  setIsFocused(false)
                }}
                onFocus={() => setIsFocused(true)}
                value={options.filter((option: SelectOption) => value == option.value)}
                defaultValue={options.filter(
                  (option: SelectOption) => value == option.value
                )}
                isClearable={isClearable}
                aria-label={label}
                isDisabled={disabled}
                data-cy={slugify(`select-${label}`)}
                isSearchable={Boolean(enableSearch)}
                noOptionsMessage={() => enableSearch?.noOptionsMessage}
              />
            )
          }}
        />
      </SelectContainer>
      <ErrorLabel variant='caption' mt='0.2rem' error={error}>
        {error !== 'generic_error' ? error : ''}
      </ErrorLabel>
    </Box>
  )
}

Select.defaultProps = {
  error: undefined,
  placeholder: undefined,
  isClearable: true,
  isMulti: undefined,
  enableSearch: undefined,
}

export { Select }
