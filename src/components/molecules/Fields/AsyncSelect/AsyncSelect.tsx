/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import ReactSelectAsync from 'react-select/async'

import debounce from 'lodash/debounce'

import { Box } from 'components/atoms'

import { System } from 'types'
import { slugify } from 'utils'

import { SelectContainer, FieldLabel, ErrorLabel } from './styled'

export type AsyncSelectOption = Record<string, any>

export type AsyncSelectProps<FormType extends FieldValues> = {
  error?: string | undefined | null | 'generic_error'
  noOptionsMessage: string
  isMulti?: boolean
  loadOptions: (inputValue?: string | undefined) => Promise<AsyncSelectOption[]>
  defaultOptions?: AsyncSelectOption[]
  debounceTime?: number
  isClearable?: boolean
  isSearchable?: boolean

  name: Path<FormType>
  label: string

  placeholder?: string

  control: Control<FormType>
  reactSelectProps?: any
  reactSelectStyles?: any
} & Omit<System<'input'>, 'autoComplete' | 'defaultValue'>

const AsyncSelect = <FormType extends FieldValues>(props: AsyncSelectProps<FormType>) => {
  const {
    control,
    loadOptions,
    defaultOptions: initDefaultOptions,
    label,
    debounceTime,
    isClearable,
    isSearchable,
    error,
    isMulti,
    noOptionsMessage,
    disabled,
    name,
    required,
    placeholder,
    id,
    reactSelectProps,
    reactSelectStyles,
    ...rest
  } = props

  const resolvedId = id || slugify(`select-container-${label}`)
  const resolvedInputId = `select-input-${id}` || slugify(`select-input-${label}`)

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<AsyncSelectOption[]>(initDefaultOptions || [])
  const [defaultOptions, setDefaultOptions] = useState<AsyncSelectOption[] | undefined>(
    initDefaultOptions || []
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadOptionsResolver = useCallback(
    debounce((inputValue: string, callback: (value: AsyncSelectOption[]) => void) => {
      loadOptions(inputValue).then(callback)
    }, debounceTime),

    [loadOptions, debounceTime]
  )

  const loadOptionsHandler = useCallback(
    (inputValue: string, callback: (value: AsyncSelectOption[]) => void) => {
      loadOptionsResolver(inputValue, callback)
    },
    [loadOptionsResolver]
  )

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
      menuPortal: (provided: any) => ({ ...provided, zIndex: 9999 }),
      ...reactSelectStyles,
    }),
    [isMulti, reactSelectStyles]
  )

  useEffect(() => {
    if (defaultOptions?.length) {
      setOptions(defaultOptions)
    }
  }, [defaultOptions])

  useEffect(() => {
    if (!isSearchable) {
      const resolve = async () => {
        const opts = await loadOptions()

        setDefaultOptions(opts)
      }

      try {
        setIsLoading(true)

        resolve()
      } catch (resolveerror) {
        // eslint-disable-next-line no-console
        console.error(resolveerror)
      } finally {
        setIsLoading(false)
      }
    }
  }, [isSearchable, loadOptions])

  return (
    <Box m='0.8rem 0' display='inline-block' w='fit-content' {...rest}>
      <FieldLabel
        as='label'
        variant='caption'
        mb='0.4rem'
        isFocused={isFocused}
        error={error}
        htmlFor={resolvedInputId}
      >
        {label}
      </FieldLabel>
      <SelectContainer error={error} isFocused={isFocused} disabled={disabled}>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onBlur, onChange, name: controllerName, ref } }) => {
            if (isMulti) {
              return (
                <ReactSelectAsync<AsyncSelectOption, true>
                  {...reactSelectProps}
                  name={controllerName}
                  ref={ref}
                  id={resolvedId}
                  instanceId={resolvedId}
                  inputId={resolvedInputId}
                  styles={customSelectStyles}
                  loadOptions={loadOptionsHandler}
                  placeholder={placeholder === undefined ? label : placeholder}
                  isMulti={isMulti}
                  onChange={selectedOptions => {
                    if (!selectedOptions && defaultOptions) {
                      setOptions(defaultOptions)
                    }

                    onChange(selectedOptions)
                  }}
                  onBlur={() => {
                    onBlur()
                    setIsFocused(false)
                  }}
                  defaultOptions={defaultOptions}
                  onFocus={() => setIsFocused(true)}
                  value={value}
                  defaultValue={value}
                  isClearable={isClearable}
                  aria-label={label}
                  isDisabled={disabled}
                  data-cy={slugify(`select-${label}`)}
                  isSearchable={isSearchable}
                  noOptionsMessage={() => noOptionsMessage}
                  isLoading={isLoading}
                />
              )
            }

            return (
              <ReactSelectAsync
                {...reactSelectProps}
                name={controllerName}
                ref={ref}
                id={resolvedId}
                instanceId={resolvedId}
                inputId={resolvedInputId}
                styles={customSelectStyles}
                loadOptions={loadOptionsHandler}
                placeholder={placeholder === undefined ? label : placeholder}
                onChange={selectedOption => {
                  if (!selectedOption && defaultOptions) {
                    setOptions(defaultOptions)
                  }
                  // @ts-ignore
                  onChange(selectedOption?.value || null)
                }}
                onBlur={() => {
                  onBlur()
                  setIsFocused(false)
                }}
                defaultOptions={defaultOptions}
                onFocus={() => setIsFocused(true)}
                value={options.filter(
                  (option: AsyncSelectOption) => value == option.value
                )}
                defaultValue={options.filter(
                  (option: AsyncSelectOption) => value == option.value
                )}
                isClearable={isClearable}
                aria-label={label}
                isDisabled={disabled}
                data-cy={slugify(`select-${label}`)}
                isSearchable={isSearchable}
                noOptionsMessage={() => noOptionsMessage}
                isLoading={isLoading}
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

AsyncSelect.defaultProps = {
  error: undefined,
  defaultOptions: undefined,
  debounceTime: 700,
  isClearable: true,
  isSearchable: true,
  placeholder: undefined,
  isMulti: undefined,
  reactSelectProps: undefined,
  reactSelectStyles: undefined,
}

export { AsyncSelect }
