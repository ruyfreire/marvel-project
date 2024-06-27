import { CharacterResponse } from '@/@types/marvel'
import api from '@/lib/axios'

type GetCharactersParams = {
  name?: string
  nameStartsWith?: string
  comics?: number
  series?: number
  offset?: number
}

export async function getCharacters(params?: GetCharactersParams) {
  const response = await api.get<CharacterResponse>('/v1/public/characters', {
    params: params || {},
  })

  return response.data
}
