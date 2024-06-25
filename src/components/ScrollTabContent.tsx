import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PaginationCustom } from './PaginationCustom'

type TabContentProps = {
  content: {
    resourceURI: string
    name: string
  }[]
  count: number
}

export function ScrollTabContent({ content, count }: TabContentProps) {
  return (
    <>
      <ScrollArea className="h-[50vh]">
        {content.map((item) => {
          return (
            <Card key={item.resourceURI} className="p-4 mt-4">
              <a
                target="_blank"
                href={item.resourceURI}
                className="text-base underline"
              >
                {item.name}
              </a>
            </Card>
          )
        })}
      </ScrollArea>

      <PaginationCustom count={count} />
    </>
  )
}
