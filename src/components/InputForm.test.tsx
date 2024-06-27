import { fireEvent, render, screen } from '@testing-library/react'

import { InputForm } from './InputForm'

describe('<InputForm />', () => {
  it('should input text', () => {
    render(<InputForm placeholder="Name" />)

    const input = screen.getByPlaceholderText('Name')

    fireEvent.change(input, { target: { value: 'Marvel' } })

    expect(input).toHaveValue('Marvel')
  })

  it('should show error message', () => {
    const { rerender } = render(<InputForm placeholder="Name" />)

    expect(screen.queryByText('Required field')).toBeNull()

    rerender(<InputForm placeholder="Name" errorMessage="Required field" />)

    expect(screen.queryByText('Required field')).toBeInTheDocument()
  })
})
