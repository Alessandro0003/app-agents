import { api } from '@/services'

export const getQuestions = async () => {
  return await api.get('/questions').then(res => res.data.data)
}