import { useQuery } from '@tanstack/react-query'
import { HeartCrack } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useParams, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getBioByCharacterId } from '@/api/get-bio-by-character'
import { getCharacterById } from '@/api/get-character-by-id'
import { ScrollTabContent } from '@/components/ScrollTabContent'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type TabNames = 'comics' | 'series' | 'stories' | 'events' | null

const TOTAL_PER_PAGE = 10

export function Details() {
  const { id } = useParams()

  const [searchParams, setSearchParams] = useSearchParams()

  const currentTab = (searchParams.get('tab') as TabNames) ?? 'comics'
  const page = searchParams.get('page')

  const handleChangeTab = (tab: string) => {
    setSearchParams((state) => {
      state.set('tab', tab)
      state.set('page', '1')

      return state
    })
  }

  const { data: resultCharacter, isLoading } = useQuery({
    queryKey: ['characters', id],
    queryFn: () =>
      getCharacterById({
        characterId: id,
      }),
  })

  const offset = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(page ?? '1')

  const { data: result } = useQuery({
    queryKey: ['character', currentTab, id, offset],
    queryFn: () =>
      getBioByCharacterId({
        type: currentTab,
        characterId: id,
        offset: offset * TOTAL_PER_PAGE,
      }),
  })

  if (isLoading) {
    return (
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[1fr,1fr]">
        <Skeleton />

        <div className="grid grid-rows-[2rem,8rem,2rem,1fr,2rem] gap-4">
          <Skeleton className="w-1/3" />
          <Skeleton />
          <div className="grid grid-cols-4 gap-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    )
  }

  if (
    !resultCharacter ||
    !Array.isArray(resultCharacter.data.results) ||
    resultCharacter.data.results.length === 0 ||
    !id
  ) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <HeartCrack size={84} />

        <h1 className="mb-2 mt-4 text-2xl font-bold">
          Oh não, o personagem não foi encontrado!
        </h1>

        <p>Volte para a tela inicial e tente encontrar seu herói</p>
      </div>
    )
  }

  const character = resultCharacter.data.results[0]

  const pathImage = `${character.thumbnail.path}.${character.thumbnail.extension}`

  return (
    <>
      <Helmet title={`${character.name} - ${currentTab}`} />

      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[1fr,1px,1fr]">
        <div className="flex flex-col gap-4">
          <img
            className="max-h-[calc(70vh)] w-full self-center rounded-md object-cover"
            src={pathImage}
            alt={character.name}
          />

          <h2 className="mb-4 text-2xl font-bold">{character.name}</h2>
        </div>

        <Separator
          orientation="vertical"
          className="hidden bg-gray-100 md:block"
        />

        <div>
          <h3 className="mb-4 text-2xl font-bold underline">Bio</h3>

          <p className="mb-4">{character.description}</p>

          <Tabs defaultValue={currentTab} onValueChange={handleChangeTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="comics">Comics</TabsTrigger>
              <TabsTrigger value="series">Series</TabsTrigger>
              <TabsTrigger value="stories">Stories</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="comics">
              <ScrollTabContent
                data={result?.data}
                totalPerPage={TOTAL_PER_PAGE}
              />
            </TabsContent>

            <TabsContent value="series">
              <ScrollTabContent
                data={result?.data}
                totalPerPage={TOTAL_PER_PAGE}
              />
            </TabsContent>

            <TabsContent value="stories">
              <ScrollTabContent
                data={result?.data}
                totalPerPage={TOTAL_PER_PAGE}
              />
            </TabsContent>

            <TabsContent value="events">
              <ScrollTabContent
                data={result?.data}
                totalPerPage={TOTAL_PER_PAGE}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
