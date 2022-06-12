import React from 'react'

type FormValue<TValue> = {
  error: string
  touched: boolean
  value: TValue
}
type FormValues<Fields extends Record<string, unknown>> = {
  [FieldKey in keyof Fields]: FormValue<Fields[FieldKey]>
}

const mapFieldsToFormValues = <Fields extends Record<string, unknown>>(fields: Fields) => {
  const formValues = Object.entries(fields).reduce((formValues, [fieldName, fieldValue]) => {
    return {
      ...formValues,
      [fieldName]: {
        touched: false,
        error: '',
        value: fieldValue,
      },
    }
  }, {} as FormValues<typeof fields>)

  return formValues
}

export const useFormValues = <Fields extends Record<string, unknown>>(fields: Fields) => {
  const [formValues, setFormValues] = React.useState(mapFieldsToFormValues(fields))

  const setValue = React.useCallback(
    <TValue,>(id: string, value: TValue) => {
      return setFormValues(formValues => ({
        ...formValues,
        [id]: {
          ...formValues[id],
          value,
          error: '',
          touched: true,
        },
      }))
    },
    [setFormValues]
  )

  const setTouched = React.useCallback(
    (id: string, touched = true) => {
      return setFormValues(formValues => ({
        ...formValues,
        [id]: {
          ...formValues[id],
          touched,
        },
      }))
    },
    [setFormValues]
  )

  const setError = React.useCallback(
    (id: string, error: string) => {
      return setFormValues(formValues => ({
        ...formValues,
        [id]: {
          ...formValues[id],
          touched: true,
          error,
        },
      }))
    },
    [setFormValues]
  )

  const handleOnChange = React.useCallback(
    <THTMLElement extends HTMLInputElement | HTMLTextAreaElement>(e: React.ChangeEvent<THTMLElement>) => {
      const {id, value} = e.currentTarget
      if (!value) {
        setError(id, 'This field is required')
      }
      return setValue(id, value)
    },
    [setValue, setError]
  )

  const handleOnBlur = React.useCallback(
    <THTMLElement extends HTMLInputElement | HTMLTextAreaElement>(e: React.ChangeEvent<THTMLElement>) => {
      const {id, value} = e.currentTarget
      if (!value) {
        return setError(id, 'This field is required')
      }
      return setTouched(id)
    },
    [setTouched]
  )

  return {
    setValue,
    setTouched,
    setError,
    formValues,
    handleOnChange,
    handleOnBlur,
  }
}
