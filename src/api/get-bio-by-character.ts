import { ComicsResponse } from '@/@types/marvel'
import api from '@/lib/axios'

type GetComicsByCharacterIdParams = {
  characterId?: string
  offset?: number
  type: 'comics' | 'events' | 'series' | 'stories'
}

export async function getBioByCharacterId({
  characterId,
  type,
  offset,
}: GetComicsByCharacterIdParams) {
  const response = await api.get<ComicsResponse>(
    `/v1/public/characters/${characterId}/${type}`,
    {
      params: { offset },
    },
  )

  return response.data
}
