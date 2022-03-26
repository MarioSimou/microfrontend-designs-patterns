import * as React from 'react'

type FormValue<V = string> = {
  value: V
  touched: boolean
  error: string
}
type FormValues<K extends string = string, V = string> = Record<K, FormValue<V>>

export const isValid = <V = string>(formValue: FormValue<V>) => !formValue.error && formValue.touched

export function useFormValues<K extends string = string, V = string>(initialFormValues: FormValues<K, V>) {
  const [formValues, setFormValues] = React.useState(initialFormValues)

  const setValue = React.useCallback(
    (id: string, value: V) => {
      return setFormValues(existingFormValues => ({
        ...existingFormValues,
        [id]: {
          touched: true,
          error: '',
          value,
        },
      }))
    },
    [setFormValues],
  )

  const setError = React.useCallback(
    (id: string, error: string) => {
      return setFormValues(existingFormValues => ({
        ...existingFormValues,
        [id]: {
          ...existingFormValues[id],
          touched: true,
          error,
        },
      }))
    },
    [setFormValues],
  )

  const setTouched = React.useCallback(
    (id: string, touched: boolean = true) => {
      return setFormValues(existingFormValues => ({
        ...existingFormValues,
        [id]: {
          ...existingFormValues[id],
          touched,
        },
      }))
    },
    [setFormValues],
  )

  return {
    formValues,
    setValue,
    setError,
    setTouched,
  }
}

export function useStringFormValues<
  K extends string = string,
  I extends HTMLElement = HTMLInputElement | HTMLTextAreaElement,
>(initialFormValues: FormValues<K, string>) {
  const {setValue, setError, setTouched, formValues} = useFormValues(initialFormValues)
  const handleOnChange = React.useCallback(
    (e: React.ChangeEvent<I & {value: string}>) => {
      const {id, value} = e.currentTarget
      if (!value) {
        setValue(id, value)
        return setError(id, 'error: value not found')
      }

      return setValue(id, value)
    },
    [setValue, setError],
  )

  const handleOnBlur = React.useCallback(
    (e: React.ChangeEvent<I>) => {
      return setTouched(e.target.id)
    },
    [setTouched],
  )

  return {
    formValues,
    setValue,
    setError,
    setTouched,
    handleOnChange,
    handleOnBlur,
  }
}

export default useFormValues
