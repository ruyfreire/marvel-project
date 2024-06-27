import { useSearchParams } from 'react-router-dom'

import { ComicsResponse } from '@/@types/marvel'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import { PaginationCustom } from './PaginationCustom'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { Skeleton } from './ui/skeleton'

type TabContentProps = {
  data: ComicsResponse['data'] | undefined
  totalPerPage: number
}

export function ScrollTabContent({ data, totalPerPage }: TabContentProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = searchParams.get('page')

  const handleChangePage = (newPage: number) => {
    setSearchParams((state) => {
      state.set('page', String(newPage))

      return state
    })
  }

  if (!data) {
    return (
      <div className="flex h-[50vh] flex-col">
        <Skeleton className="mt-4 flex-1" />
        <Skeleton className="mt-4 flex-1" />
        <Skeleton className="mt-4 flex-1" />
        <Skeleton className="mt-4 flex-1" />
        <Skeleton className="mt-4 flex-1" />
      </div>
    )
  }

  if (data.results.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        Nada foi encontrado!
      </div>
    )
  }

  const { total, results } = data

  return (
    <>
      <ScrollArea className="h-[60vh]">
        {results.map((item) => {
          let pathImage = ''
          if (item.thumbnail?.path) {
            pathImage = `${item.thumbnail.path}.${item.thumbnail.extension}`
          }

          let externalLink = ''
          if (item.urls && item.urls.length > 0) {
            const detailLink = item.urls.find((url) => url.type === 'detail')
            if (detailLink) {
              externalLink = detailLink.url
            }
          }

          return (
            <Card key={item.id} className="mt-4 flex gap-4 p-4">
              {pathImage && (
                <HoverCard openDelay={200} closeDelay={200}>
                  <HoverCardTrigger>
                    <img
                      className="h-32 w-32 rounded-sm object-cover"
                      src={pathImage}
                      alt=""
                    />
                  </HoverCardTrigger>

                  <HoverCardContent className="flex items-center">
                    <img
                      className="m-auto h-[30vh] rounded-sm border"
                      src={pathImage}
                      alt=""
                    />
                  </HoverCardContent>
                </HoverCard>
              )}

              {externalLink ? (
                <a
                  target="_blank"
                  href={externalLink}
                  className="text-base underline"
                >
                  {item.title}
                </a>
              ) : (
                <span className="text-base">{item.title}</span>
              )}
            </Card>
          )
        })}
      </ScrollArea>

      <PaginationCustom
        current={page ? Number(page) : 1}
        total={total}
        onPageChange={handleChangePage}
        totalPerPage={totalPerPage}
      />
    </>
  )
}
