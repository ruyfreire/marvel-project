import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useState } from 'react'

type PaginationCustomProps = {
  count: number
  onChange?: (page: number) => void
}

export function PaginationCustom({ count }: PaginationCustomProps) {
  const [current, setCurrent] = useState(1)

  const lastPage = count >= 20 ? Math.floor(count / 20) + 1 : 1

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={current <= 1}
            tabIndex={current <= 1 ? -1 : undefined}
            className={
              current <= 1 ? 'pointer-events-none opacity-50' : undefined
            }
            href="#"
            onClick={() => current > 1 && setCurrent((prev) => prev - 1)}
          />
        </PaginationItem>

        {current !== 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => setCurrent(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {current > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href="#" isActive>
            {current}
          </PaginationLink>
        </PaginationItem>

        {lastPage - current > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {current !== lastPage && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => setCurrent(lastPage)}>
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={current >= lastPage}
            tabIndex={current >= lastPage ? -1 : undefined}
            className={
              current >= lastPage ? 'pointer-events-none opacity-50' : undefined
            }
            onClick={() => current < lastPage && setCurrent((prev) => prev + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
