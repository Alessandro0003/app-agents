import { zodResolver } from "@hookform/resolvers/zod";
import {
	type UseFormProps,
	type UseFormReturn,
	useForm,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Schema } from "./schema";
import type { QuestionFormInput, QuestionFormOutput } from "./types";

export const useQuestionForm = (props: UseFormProps<QuestionFormInput> = {}) =>
	// biome-ignore lint/suspicious/noExplicitAny: use any type for the output
	useForm<QuestionFormInput, any, QuestionFormOutput>({
		resolver: zodResolver(Schema),
		...props,
	});

export interface QuestionFormProps
	// biome-ignore lint/suspicious/noExplicitAny: use any type for the output
	extends UseFormReturn<QuestionFormInput, any, QuestionFormOutput> {
	onSubmit: (data: QuestionFormOutput) => void;
	isSubmitting?: boolean;
}

export const QuestionForm = (props: QuestionFormProps) => {
	const { onSubmit, isSubmitting, ...form } = props;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Fazer uma Pergunta</CardTitle>
				<CardDescription>
					Digite sua pergunta abaixo para receber uma resposta gerada por I.A.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className="flex flex-col gap-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							name="question"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sua Pergunta</FormLabel>
									<FormControl>
										<Textarea
											className="min-h-[100px]"
											disabled={isSubmitting}
											placeholder="O que você gostaria de saber?"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button disabled={isSubmitting} type="submit">
							Enviar pergunta
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
