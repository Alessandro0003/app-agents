import { questionSchema } from "../../schemas";


export const Schema = questionSchema.pick({
  question: true
})