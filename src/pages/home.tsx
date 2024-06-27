import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getCharacters } from '@/api/get-characters'
import { CircleMap } from '@/components/CircleMapa'
import { InputForm } from '@/components/InputForm'
import { PaginationCustom } from '@/components/PaginationCustom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const filterSchema = z.object({
  name: z.string().optional(),
  partialName: z.string().optional(),
  comics: z
    .string()
    .refine((val) => val === '' || !isNaN(Number(val)), {
      message: 'Digite apenas números',
    })
    .optional(),
  series: z
    .string()
    .refine((val) => val === '' || !isNaN(Number(val)), {
      message: 'Digite apenas números',
    })
    .optional(),
})

type FilterSchema = z.infer<typeof filterSchema>

const TOTAL_PER_PAGE = 20

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const name = searchParams.get('name')
  const partialName = searchParams.get('partialName')
  const comics = searchParams.get('comics')
  const series = searchParams.get('series')
  const page = searchParams.get('page')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      name: name || '',
      partialName: partialName || '',
      comics: comics || '',
      series: series || '',
    },
  })

  const handleSubmitForm = (data: FilterSchema) => {
    setSearchParams((state) => {
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          state.set(key, value)
        } else {
          state.delete(key)
        }
      })

      state.set('page', '1')

      return state
    })
  }

  const handleClear = () => {
    setSearchParams((state) => {
      state.delete('name')
      state.delete('partialName')
      state.delete('comics')
      state.delete('series')
      state.delete('page')

      return state
    })

    reset({
      name: '',
      partialName: '',
      comics: '',
      series: '',
    })
  }

  const handleChangePage = (page: number) => {
    setSearchParams((state) => {
      state.set('page', String(page))

      return state
    })
  }

  const offset = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(page ?? '1')

  const { data: result, isLoading } = useQuery({
    queryKey: ['characters', name, partialName, comics, series, offset],
    queryFn: () =>
      getCharacters({
        name: name || undefined,
        nameStartsWith: partialName || undefined,
        comics: comics ? Number(comics) : undefined,
        series: series ? Number(series) : undefined,
        offset: offset * TOTAL_PER_PAGE,
      }),
  })

  return (
    <>
      <Helmet title="Home" />

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="mb-4 flex w-full flex-wrap gap-4 p-2">
          <InputForm
            placeholder="Nome Completo"
            {...register('name')}
            errorMessage={errors.name?.message}
          />

          <InputForm
            placeholder="Name (Parcial)"
            {...register('partialName')}
            errorMessage={errors.partialName?.message}
          />

          <InputForm
            placeholder="Comic ID"
            {...register('comics')}
            errorMessage={errors.comics?.message}
          />

          <InputForm
            placeholder="Serie ID"
            {...register('series')}
            errorMessage={errors.series?.message}
          />

          <div className="m-auto flex flex-1 basis-full gap-4 self-center md:basis-auto">
            <Button
              type="button"
              variant="ghost"
              className="flex-2"
              onClick={handleClear}
            >
              Limpar
            </Button>

            <Button type="submit" className="flex-1">
              Filtrar
            </Button>
          </div>
        </div>
      </form>

      <div className="mb-4 flex w-full justify-center">
        <CircleMap rawData={result?.data.results || []} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,20rem))] justify-evenly gap-4">
        {isLoading &&
          Array.from({ length: 20 }).map((_, index) => {
            return (
              <Skeleton key={index} className="h-[21rem] w-full rounded-md" />
            )
          })}

        {!result && !isLoading && (
          <div className="flex items-center justify-center py-8">
            Nada foi encontrado!
          </div>
        )}

        {result &&
          result.data.results.map((character) => {
            const pathImage = `${character.thumbnail.path}.${character.thumbnail.extension}`

            return (
              <Link
                to={`/detalhes/${character.id}`}
                key={character.id}
                className="min-h-[21rem] transition-transform hover:scale-95 hover:opacity-90"
              >
                <Card className="flex h-full flex-col gap-2 p-4">
                  <CardContent className="p-0">
                    <img
                      src={pathImage}
                      alt={character.name}
                      className="h-60 w-full rounded-md object-cover"
                    />
                  </CardContent>

                  <CardFooter className="p-0">
                    <h4 className="text-xl font-bold">{character.name}</h4>
                  </CardFooter>
                </Card>
              </Link>
            )
          })}
      </div>

      {result?.data && (
        <div className="py-4">
          <PaginationCustom
            current={page ? Number(page) : 1}
            total={result.data.total}
            onPageChange={handleChangePage}
            totalPerPage={TOTAL_PER_PAGE}
          />
        </div>
      )}
    </>
  )
}
