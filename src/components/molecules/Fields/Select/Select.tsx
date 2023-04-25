/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo, useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import ReactSelect, { MultiValue, SingleValue } from 'react-select'

import { StyleModeContext } from 'contexts/StyleModeContext'

import { StyleModes, System } from 'types'
import { slugify } from 'utils'

import {
  SelectContainer,
  FieldLabel,
  ErrorLabel,
  MinimalistBorderHelper,
  RootContainer,
} from './styled'

export type SelectOption = Record<string, any>

export type SelectProps<FormType extends FieldValues> = {
  error?: string | undefined | null | 'generic_error'
  enableSearch?: {
    noOptionsMessage: string
  }
  isClearable?: boolean

  name: Path<FormType>
  label: string
  options: Array<SelectOption>
  placeholder?: string
  styleMode?: StyleModes

  control: Control<FormType>
} & (
  | {
      isMulti: true
      onChange?: (params: MultiValue<SelectOption>) => void
    }
  | {
      isMulti?: false
      onChange?: (params: SingleValue<SelectOption>) => void
    }
) &
  Omit<System<'input'>, 'autoComplete' | 'onChange'>

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
    id,
    styleMode: localStyleMode,
    onChange: customOnChange,
    ...rest
  } = props

  const globalStyleMode = StyleModeContext.useSelector(state => state.defaultStyleMode)
  const styleMode = useMemo(
    () => localStyleMode || globalStyleMode,
    [globalStyleMode, localStyleMode]
  )

  const resolvedId = id || slugify(`select-container-${label}`)
  const resolvedInputId = `select-input-${id}` || slugify(`select-input-${label}`)

  const placeholderId = `react-select-${resolvedId}-placeholder`

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
        backgroundColor: state.isSelected
          ? styleMode === 'minimalist'
            ? '#9855ff'
            : '#2957a4'
          : 'transparent',
      }),
      valueContainer: (provided: any) => ({
        ...provided,
        ...(styleMode === 'minimalist'
          ? {
              padding: '2px 8px 2px 0',
              marginLeft: '-2px',
            }
          : {}),
      }),
    }),
    [isMulti, styleMode]
  )

  return (
    <RootContainer
      m='0.8rem 0'
      display='inline-block'
      w='fit-content'
      {...rest}
      isFocused={isFocused}
      styleMode={styleMode}
      error={error}
      placeholderId={placeholderId}
    >
      <FieldLabel
        as='label'
        variant='caption'
        mb='0.4rem'
        isFocused={isFocused}
        styleMode={styleMode}
        error={error}
        htmlFor={resolvedInputId}
      >
        {label}
      </FieldLabel>
      <SelectContainer
        error={error}
        isFocused={isFocused}
        styleMode={styleMode}
        disabled={disabled}
        placeholderId={placeholderId}
      >
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onBlur, onChange } }) => {
            if (isMulti) {
              return (
                <ReactSelect<SelectOption, true>
                  id={resolvedId}
                  instanceId={resolvedId}
                  inputId={resolvedInputId}
                  styles={customSelectStyles}
                  options={options}
                  placeholder={placeholder === undefined ? label : placeholder}
                  isMulti={isMulti}
                  onChange={selectedOptions => {
                    customOnChange?.(selectedOptions as any)
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
                  data-cy={resolvedId}
                  isSearchable={Boolean(enableSearch)}
                  noOptionsMessage={() => enableSearch?.noOptionsMessage}
                />
              )
            }

            return (
              <ReactSelect
                id={resolvedId}
                instanceId={resolvedId}
                inputId={resolvedInputId}
                styles={customSelectStyles}
                options={options}
                placeholder={placeholder === undefined ? label : placeholder}
                onChange={selectedOption => {
                  customOnChange?.(selectedOption as any)
                  onChange(selectedOption?.value || null)
                }}
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
                data-cy={resolvedId}
                isSearchable={Boolean(enableSearch)}
                noOptionsMessage={() => enableSearch?.noOptionsMessage}
              />
            )
          }}
        />
      </SelectContainer>
      <MinimalistBorderHelper
        error={error}
        isFocused={isFocused}
        disabled={disabled}
        styleMode={styleMode}
      />
      <ErrorLabel variant='caption' mt='0.2rem' error={error}>
        {error !== 'generic_error' ? error : ''}
      </ErrorLabel>
    </RootContainer>
  )
}

Select.defaultProps = {
  error: undefined,
  placeholder: undefined,
  isClearable: true,
  enableSearch: undefined,
  styleMode: undefined,
}

export { Select }
