import React from 'react'
import { useForm } from 'react-hook-form'

import { Flex } from 'components/atoms/Flex'

import { Select } from './Select'

type FormValues = {
  select: string
  'select-search': string
  'error-select': string
  'multi-select': string
  'disabled-select': string
}

const options = [
  {
    label: 'Option 1',
    value: 'Value 1',
  },
  {
    label: 'Option 2',
    value: 'Value 2',
  },
  {
    label: 'Option 3',
    value: 'Value 3',
  },
]

const SelectStory = () => {
  const { control } = useForm<FormValues>({
    mode: 'onBlur',
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <Flex direction='column'>
        <Select<FormValues>
          name='select'
          label='Select'
          options={options}
          control={control}
          w='300px'
        />
        <Select<FormValues>
          name='select-search'
          label='Select With Search'
          options={options}
          control={control}
          enableSearch={{ noOptionsMessage: 'No options found.' }}
          w='300px'
        />
        <Select<FormValues>
          name='error-select'
          label='Select with Error'
          options={options}
          control={control}
          w='300px'
          error='This is an error'
        />
        <Select<FormValues>
          name='multi-select'
          label='Multi Select'
          isMulti
          options={options}
          control={control}
          w='300px'
        />
        <Select<FormValues>
          name='disabled-select'
          label='Disabled Select'
          disabled
          options={options}
          control={control}
          w='300px'
        />
      </Flex>
    </form>
  )
}

export { SelectStory }
