import { z } from 'zod'
import { questionFormSchema } from './schema'

export type QuestionFormInput = z.input<typeof questionFormSchema>
export type QuestionFormOutput = z.output<typeof questionFormSchema>