import { CharacterResponse } from '@/@types/marvel'
import api from '@/lib/axios'

type GetCharacterByIdParams = {
  characterId?: string
}

export async function getCharacterById({
  characterId,
}: GetCharacterByIdParams) {
  const response = await api.get<CharacterResponse>(
    `/v1/public/characters/${characterId}`,
  )

  return response.data
}
