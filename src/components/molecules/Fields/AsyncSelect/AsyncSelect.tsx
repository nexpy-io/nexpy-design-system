/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import ReactSelectAsync from 'react-select/async'

import { StyleModeContext } from 'contexts/StyleModeContext'
import debounce from 'lodash/debounce'

import { useRegisterFieldFocus } from 'hooks/useRegisterFieldFocus'
import { StyleModes, System } from 'types'
import { slugify } from 'utils'

import {
  SelectContainer,
  FieldLabel,
  ErrorLabel,
  RootContainer,
  MinimalistBorderHelper,
} from './styled'

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
  styleMode?: StyleModes

  name: Path<FormType>
  label: string

  placeholder?: string
  selectedColor?: string

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
    selectedColor,
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
    styleMode: localStyleMode,
    onKeyDown,
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
        backgroundColor: state.isSelected
          ? styleMode === 'minimalist'
            ? selectedColor || '#9855ff'
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
      menuPortal: (provided: any) => ({ ...provided, zIndex: 9999 }),
      ...reactSelectStyles,
    }),
    [isMulti, reactSelectStyles, selectedColor, styleMode]
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

  const onKeyDownAuto = useRegisterFieldFocus(name)

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
        error={error}
        htmlFor={resolvedInputId}
        styleMode={styleMode}
        disabled={disabled}
      >
        {label}
      </FieldLabel>
      <SelectContainer
        error={error}
        isFocused={isFocused}
        disabled={disabled}
        styleMode={styleMode}
        placeholderId={placeholderId}
      >
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
                  onKeyDown={e => {
                    onKeyDownAuto(e)

                    if (typeof onKeyDown === 'function') {
                      onKeyDown(e as any)
                    }
                  }}
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
                onKeyDown={e => {
                  onKeyDownAuto(e)

                  if (typeof onKeyDown === 'function') {
                    onKeyDown(e as any)
                  }
                }}
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

AsyncSelect.defaultProps = {
  error: undefined,
  defaultOptions: undefined,
  debounceTime: 700,
  styleMode: undefined,
  selectedColor: undefined,
  isClearable: true,
  isSearchable: true,
  placeholder: undefined,
  isMulti: undefined,
  reactSelectProps: {
    menuPosition: 'fixed',
    menuPlacement: 'auto',
  },
  reactSelectStyles: undefined,
}

export { AsyncSelect }
