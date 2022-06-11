import React from 'react'
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Collapse,
  Textarea,
  InputProps,
  TextareaProps,
} from '@chakra-ui/react'

type FieldProps = {
  id: string
  label: string
  helper?: string
  error: string
  touched: boolean
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  children: JSX.Element
} & FormControlProps

export const Field: React.FC<FieldProps> = ({
  id,
  label,
  helper,
  error,
  touched,
  required,
  disabled,
  readOnly,
  children,
  ...rest
}) => {
  const isInvalid = Boolean(error && touched)
  return (
    <FormControl
      id={id}
      isInvalid={isInvalid}
      isDisabled={disabled}
      isReadOnly={readOnly}
      isRequired={required}
      {...rest}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {helper && <FormHelperText>{helper}</FormHelperText>}
      {children}
      <Collapse in={isInvalid}>
        <FormErrorMessage>{error}</FormErrorMessage>
      </Collapse>
    </FormControl>
  )
}
