import { http, HttpResponse } from 'msw'

import { characterDetails } from './data/character-detail'
import { characters } from './data/characters'
import { comics } from './data/comics'
import { events } from './data/events'
import { series } from './data/series'
import { stories } from './data/stories'

export const handlers = [
  http.get('http://gateway.marvel.com/v1/public/characters', () => {
    return HttpResponse.json(characters)
  }),
  http.get('http://gateway.marvel.com/v1/public/characters/:id', () => {
    return HttpResponse.json(characterDetails)
  }),
  http.get(
    'http://gateway.marvel.com/v1/public/characters/:id/comics',
    ({ request }) => {
      const searchParams = new URL(request.url).searchParams
      const offset = Number(searchParams.get('offset'))
      const page = Math.ceil(offset / 20)

      return HttpResponse.json(comics[page])
    },
  ),
  http.get('http://gateway.marvel.com/v1/public/characters/:id/series', () => {
    return HttpResponse.json(series)
  }),
  http.get('http://gateway.marvel.com/v1/public/characters/:id/stories', () => {
    return HttpResponse.json(stories)
  }),
  http.get('http://gateway.marvel.com/v1/public/characters/:id/events', () => {
    return HttpResponse.json(events)
  }),
]
