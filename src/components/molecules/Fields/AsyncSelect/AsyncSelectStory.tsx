import React from 'react'
import { useForm } from 'react-hook-form'

import { Flex } from 'components/atoms/Flex'

import { AsyncSelect, AsyncSelectOption } from './AsyncSelect'

type FormValues = {
  select: string
  minimalist: string
  'multi-select': AsyncSelectOption[]
  'select-default': string
  'multi-select-default': AsyncSelectOption[]
  'multi-select-default-error': AsyncSelectOption[]
  'multi-select-default-disabled': AsyncSelectOption[]
}

const options = [
  {
    label: 'Option 1',
    value: 'OPTION_1',
  },
  {
    label: 'Option 2',
    value: 'OPTION_2',
  },
  {
    label: 'Option 3',
    value: 'OPTION_3',
  },
]

const AsyncSelectStory = () => {
  const { control } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      'select-default': 'OPTION_1',
      'multi-select-default': [
        {
          label: 'Option 1',
          value: 'OPTION_1',
        },
        {
          label: 'Option 2',
          value: 'OPTION_2',
        },
      ],
      'multi-select-default-disabled': [
        {
          label: 'Option 1',
          value: 'OPTION_1',
        },
        {
          label: 'Option 2',
          value: 'OPTION_2',
        },
      ],
    },
  })

  const handleLoadOptions = (searchValue?: string) =>
    new Promise<AsyncSelectOption[]>(resolve => {
      setTimeout(() => {
        resolve(
          options.filter(i =>
            i.label.toLowerCase().includes(searchValue?.toLowerCase() || '')
          )
        )
      }, 700)
    })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <Flex direction='column'>
        <AsyncSelect<FormValues>
          w='400px'
          name='select'
          label='Async Select'
          noOptionsMessage='No options found'
          defaultOptions={options}
          loadOptions={handleLoadOptions}
          control={control}
        />
        <AsyncSelect<FormValues>
          w='400px'
          name='minimalist'
          label='Minimalist Select'
          noOptionsMessage='No options found'
          defaultOptions={options}
          loadOptions={handleLoadOptions}
          control={control}
          styleMode='minimalist'
        />
        <AsyncSelect<FormValues>
          w='400px'
          name='multi-select'
          label='Multi Async Select'
          isMulti
          noOptionsMessage='No options found'
          defaultOptions={options}
          loadOptions={handleLoadOptions}
          control={control}
        />
        <AsyncSelect<FormValues>
          w='400px'
          name='select-default'
          label='Async Select with default value'
          noOptionsMessage='No options found'
          defaultOptions={options}
          loadOptions={handleLoadOptions}
          control={control}
        />
        <AsyncSelect<FormValues>
          w='400px'
          name='multi-select-default'
          label='Multi Async Select with default value'
          isMulti
          noOptionsMessage='No options found'
          defaultOptions={options}
          loadOptions={handleLoadOptions}
          control={control}
        />
        <AsyncSelect<FormValues>
          w='400px'
          name='multi-select-default-error'
          label='Multi Async Select with error'
          isMulti
          noOptionsMessage='No options found'
          defaultOptions={options}
          error='This is an error'
          loadOptions={handleLoadOptions}
          control={control}
        />
        <AsyncSelect<FormValues>
          w='400px'
          name='multi-select-default-disabled'
          label='Multi Async Select with default value and disabled'
          isMulti
          noOptionsMessage='No options found'
          defaultOptions={options}
          disabled
          loadOptions={handleLoadOptions}
          control={control}
        />
      </Flex>
    </form>
  )
}

export { AsyncSelectStory }
