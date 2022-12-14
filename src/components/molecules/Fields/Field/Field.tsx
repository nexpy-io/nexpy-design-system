/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef, useState, ReactNode, FocusEventHandler } from 'react'

import { Input, InputProps, Box, Label, Span } from 'components/atoms'

import { InputContainer, FieldLabel, ErrorLabel, FileInputSpanButton } from './styled'

export type FieldProps = {
  label: string
  error?: string | undefined | null | 'generic_error'
  prefixElement?: ReactNode
  sufixElement?: ReactNode
  browserAutoComplete?: string | undefined
  fileTypeOptions?: {
    accept?: string
    inputMessage: string
  }
  type?:
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'text'
    | 'time'
    | 'week'
    | 'email'
    | 'url'
    | 'file'
} & Omit<InputProps, 'autoComplete'>

const Field = forwardRef<HTMLInputElement, FieldProps>((props, ref) => {
  const {
    label,
    error,
    disabled,
    prefixElement,
    fileTypeOptions,
    sufixElement,
    type,
    onFocus,
    onBlur,
    defaultValue,
    name,
    onChange,
    required,
    value,
    list,
    max,
    min,
    placeholder,
    readOnly,
    step,
    alt,
    autoFocus,
    browserAutoComplete,
    ...rest
  } = props

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [currentFileName, setCurrentFileName] = useState<string>('')

  const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
    if (onFocus) {
      onFocus(event)
    }

    setIsFocused(true)
  }

  const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
    if (onBlur) {
      onBlur(event)
    }

    setIsFocused(false)
  }

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
      <InputContainer
        error={error}
        isFocused={isFocused}
        disabled={disabled}
        {...(type === 'file' && { pr: '0.8rem' })}
      >
        {type !== 'file' && (prefixElement || null)}
        {type === 'file' ? (
          <>
            <Label
              htmlFor={`field-${name}`}
              display='flex'
              alignItems='center'
              h='4.6rem'
              m='0 1rem 0 0.4rem'
              w='100%'
            >
              {type === 'file' && (prefixElement || null)}
              <FileInputSpanButton
                error={error}
                isFocused={isFocused}
                disabled={disabled}
              >
                {fileTypeOptions?.inputMessage || ''}
              </FileInputSpanButton>
              <Span
                h='3rem'
                textOverflow='ellipsis'
                overflow='hidden'
                whiteSpace='nowrap'
                verticalAlign='middle'
                lineHeight='3rem'
              >
                {currentFileName}
              </Span>
              {type === 'file' && (sufixElement || null)}
            </Label>
            <Input
              id={`field-${name}`}
              display='none'
              accept={fileTypeOptions?.accept}
              type={type}
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={ref}
              disabled={disabled}
              w='100%'
              defaultValue={defaultValue}
              name={name}
              onChange={e => {
                setCurrentFileName(e?.target?.files?.[0]?.name || '')

                if (onChange) {
                  onChange(e)
                }
              }}
              required={required}
              value={value}
              list={list}
              max={max}
              min={min}
              placeholder={placeholder}
              readOnly={readOnly}
              step={step}
              alt={alt}
              autoFocus={autoFocus}
              autoComplete={browserAutoComplete}
              onWheel={e => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const target = e?.target as any

                if (typeof target?.blur === 'function') {
                  target.blur()
                }
              }}
            />
          </>
        ) : (
          <Input
            id={`field-${name}`}
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={ref}
            disabled={disabled}
            w='100%'
            defaultValue={defaultValue}
            name={name}
            onChange={onChange}
            required={required}
            value={value}
            list={list}
            max={max}
            min={min}
            placeholder={placeholder}
            readOnly={readOnly}
            step={step}
            alt={alt}
            autoFocus={autoFocus}
            autoComplete={browserAutoComplete}
            onWheel={e => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const target = e?.target as any

              if (typeof target?.blur === 'function') {
                target.blur()
              }
            }}
          />
        )}
        {type !== 'file' && (sufixElement || null)}
      </InputContainer>
      <ErrorLabel variant='caption' mt='0.2rem' error={error}>
        {error !== 'generic_error' ? error : ''}
      </ErrorLabel>
    </Box>
  )
})

Field.displayName = 'Field'

Field.defaultProps = {
  error: undefined,
  prefixElement: undefined,
  sufixElement: undefined,
  browserAutoComplete: undefined,
  fileTypeOptions: undefined,
  type: 'text',
}

export { Field }
