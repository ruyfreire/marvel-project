import { PaginationCustom } from '@/components/PaginationCustom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Link } from 'react-router-dom'

type Character = {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
}

export function Home() {
  const data = {
    offset: 0,
    limit: 20,
    total: 1564,
    count: 20,
    results: [
      {
        id: 1011334,
        name: '3-D Man 3-D Man 3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
      {
        id: 1011334,
        name: '3-D Man',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg',
        },
      },
    ],
  }

  return (
    <>
      <div className="mb-4 p-2 flex gap-4">
        <Input placeholder="Name" />

        <Input placeholder="Comics/Series Title" />

        <Input placeholder="Year" />

        <Button>Filtrar</Button>
      </div>

      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
        {data.results.map((character: Character, index) => {
          const pathImage = `${character.thumbnail.path}.${character.thumbnail.extension}`

          return (
            <Link
              to={`/detalhes/${character.id}`}
              key={index}
              className="flex hover:scale-95 transition-transform hover:opacity-90"
            >
              <Card className="flex flex-col p-4 gap-2">
                <CardContent className="p-0">
                  <img
                    src={pathImage}
                    alt={character.name}
                    className="rounded-md"
                  />
                </CardContent>

                <CardFooter className="p-0">
                  <h4 className="font-bold text-xl">{character.name}</h4>
                </CardFooter>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="p-4">
        <PaginationCustom count={data.total} />
      </div>
    </>
  )
}
