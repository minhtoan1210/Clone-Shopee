/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface Props {
  type: React.HTMLInputTypeAttribute
  className?: string
  placeholder?: string
  autoComplete?: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  name: string
  errorMessage?: string
}

export default function Input({
  type,
  className,
  placeholder,
  autoComplete,
  register,
  rules,
  name,
  errorMessage
}: Props) {
  return (
    <>
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div>{errorMessage}</div>
    </>
  )
}
