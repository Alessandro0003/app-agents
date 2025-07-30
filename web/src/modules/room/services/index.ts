import { api } from '@/services'

import type { GetRoom } from './types'

export const getRoom = async (): Promise<GetRoom.Response> => {
  return await api
    .get('/rooms')
    .then((res) => res.data.data)
}