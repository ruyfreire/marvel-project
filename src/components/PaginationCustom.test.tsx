import { fireEvent, render, screen } from '@testing-library/react'

import { PaginationCustom } from './PaginationCustom'

describe('<PaginationCustom />', () => {
  it('should navigate to next page on click button', () => {
    const onPageChange = vitest.fn()

    render(
      <PaginationCustom current={1} total={100} onPageChange={onPageChange} />,
    )

    const buttonNext = screen.getByTestId('pagination-next')

    fireEvent.click(buttonNext)

    expect(onPageChange).toBeCalledWith(2)
  })

  it('should have the button previous disabled', () => {
    render(<PaginationCustom current={1} total={100} />)

    const buttonPrevious = screen.getByTestId('pagination-previous')

    expect(buttonPrevious).toBeDisabled()
  })

  it('should change current page', () => {
    const { rerender } = render(<PaginationCustom current={1} total={100} />)

    const currentPage = screen.getByTestId('current-page')

    expect(currentPage).toHaveTextContent('1')

    rerender(<PaginationCustom current={2} total={100} />)

    expect(currentPage).toHaveTextContent('2')
  })
})
