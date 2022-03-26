import * as React from 'react'
import {FormControl, FormLabel, FormErrorMessage} from '@chakra-ui/react'

type FieldProps = {
  id: string
  error?: string
  touched?: boolean
  label: string
  required?: boolean
  readOnly?: boolean
  disabled?: boolean
}

const Field: React.FC<FieldProps> = ({
  id,
  error = '',
  touched = false,
  required = false,
  readOnly = false,
  disabled = false,
  label,
  children,
}) => {
  return (
    <FormControl
      id={id}
      isInvalid={Boolean(error && touched)}
      isRequired={required}
      isDisabled={disabled}
      isReadOnly={readOnly}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {children}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

export default Field
