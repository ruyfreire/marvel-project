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
  const lastPage = total >= totalPerPage ? Math.ceil(total / totalPerPage) : 1

  return (
    <Pagination className="py-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            data-testid="pagination-previous"
            disabled={current <= 1}
            className="disabled:opacity-50"
            onClick={() => current > 1 && onPageChange?.(current - 1)}
          />
        </PaginationItem>

        {current !== 1 && (
          <PaginationItem>
            <PaginationLink
              data-testid="first-page"
              onClick={() => onPageChange?.(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {current > 2 && (
          <PaginationItem>
            <PaginationEllipsis data-testid="left-ellipsis" />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink data-testid="current-page" isActive>
            {current}
          </PaginationLink>
        </PaginationItem>

        {lastPage - current > 1 && (
          <PaginationItem>
            <PaginationEllipsis data-testid="right-ellipsis" />
          </PaginationItem>
        )}

        {current !== lastPage && (
          <PaginationItem>
            <PaginationLink
              data-testid="last-page"
              onClick={() => onPageChange?.(lastPage)}
            >
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            data-testid="pagination-next"
            disabled={current >= lastPage}
            className="disabled:opacity-50"
            onClick={() => current < lastPage && onPageChange?.(current + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
