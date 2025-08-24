import { db } from "../../db/connection.ts";
import { desc, eq } from "drizzle-orm";
import { schema } from "../../db/schemas/index.ts";
import type { GetQuestions, CreateQuestion, GetByQuestionId, DeleteQuestion } from './types.ts'

export const getQuestions = async (args: GetQuestions.Args): Promise<GetQuestions.Response> => {
    const { roomId, limit } = args;

    const question = await db
      .select({
        id: schema.questions.id,
        question: schema.questions.question,
        answer: schema.questions.answer,
        createdAt: schema.questions.createdAt,
      })
      .from(schema.questions)
      .where(eq(schema.questions.roomId, roomId))
      .orderBy(desc(schema.questions.createdAt))
      .limit(limit ?? 10);

    return question;
}

export const getQuestionById = async (
	args: GetByQuestionId.Args,
): Promise<GetByQuestionId.Response> => {
	const { id } = args;

	const result = await db
		.select({
			id: schema.questions.id,
		})
		.from(schema.questions)
		.where(eq(schema.questions.id, id))
		.limit(1);

	const question = result[0];

	return {
		id: question.id,
	};
};

export const createQuestion = async (args: CreateQuestion.Args) => {
  const { roomId, question, answer } = args;

  const result = await db
    .insert(schema.questions)
    .values({
      question,
      roomId,
      answer,
    })
    .returning();

  return result;
};

export const deleteQuestion = async (args: DeleteQuestion.Args) => {
	const { id } = args;

	const result = await db
		.delete(schema.questions)
		.where(eq(schema.questions.id, id))
		.returning();

	return result;
};