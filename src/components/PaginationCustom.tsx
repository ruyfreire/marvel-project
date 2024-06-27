import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type PaginationCustomProps = {
  current: number
  total: number
  totalPerPage?: number
  onPageChange?: (page: number) => void
}

export function PaginationCustom({
  current,
  total,
  totalPerPage = 20,
  onPageChange,
}: PaginationCustomProps) {
  const lastPage =
    total >= totalPerPage ? Math.floor(total / totalPerPage) + 1 : 1

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
            onClick={() => current > 1 && onPageChange?.(current - 1)}
          />
        </PaginationItem>

        {current !== 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => onPageChange?.(1)}>
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
            <PaginationLink href="#" onClick={() => onPageChange?.(lastPage)}>
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
            onClick={() => current < lastPage && onPageChange?.(current + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
