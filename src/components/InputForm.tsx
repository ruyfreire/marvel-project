import React from 'react'

import { Input, InputProps } from './ui/input'

type InputFormProps = InputProps & {
  errorMessage?: string
}

export const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
  ({ errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-1 basis-full flex-col gap-2 sm:basis-1/3 md:basis-auto">
        <Input {...props} ref={ref} />

        {errorMessage && (
          <span className="text-sm text-red-500">{errorMessage}</span>
        )}
      </div>
    )
  },
)
