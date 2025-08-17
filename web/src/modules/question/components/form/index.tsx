import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUp, Mic, X } from "lucide-react";
import {
	type UseFormProps,
	type UseFormReturn,
	useForm,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
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
	isRecording?: boolean;
	stopRecording: () => void;
	startRecording: () => void;
}

export const QuestionForm = (props: QuestionFormProps) => {
	const {
		onSubmit,
		isSubmitting,
		isRecording,
		stopRecording,
		startRecording,
		...form
	} = props;

	return (
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
								<div
									className="
										w-full flex items-end gap-2 md:gap-3
										mt-5
										rounded-2xl md:rounded-3xl
										bg-zinc-900 text-zinc-100
										px-3 py-2 md:px-4 md:py-3
										border border-zinc-700
									"
								>
									<div className="min-w-0 flex-1">
										<Textarea
											className="
												min-h-[100px]
												!bg-transparent !border-0 !shadow-none
												ring-0 ring-offset-0
												focus:!ring-0 focus:!ring-offset-0 focus:!outline-none focus-visible:!outline-none
												resize-none
												placeholder:text-zinc-300/70
											"
											disabled={isSubmitting}
											placeholder="O que você gostaria de saber?"
											{...field}
										/>
									</div>

									{isRecording ? (
										<Button
											type="button"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												stopRecording();
											}}
											size="icon"
											className="
											 	md:h-8 md:w-8 rounded-full
												bg-transparent hover:bg-foreground/5
												shrink-0
												cursor-pointer
											"
										>
											<X className="h-4 w-4 text-white" />
										</Button>
									) : (
										<Button
											type="submit"
											onClick={startRecording}
											size="icon"
											className="
												md:h-8 md:w-8 rounded-full
												bg-transparent hover:bg-foreground/5
												shrink-0
												cursor-pointer
											"
										>
											<Mic className="h-4 w-4 text-white" />
										</Button>
									)}

									<Button
										type="submit"
										size="icon"
										disabled={isSubmitting || !field.value?.trim()}
										className="
										 	md:h-8 md:w-8 rounded-full
											bg-zinc-400 text-black hover:bg-white/70
											shrink-0
											cursor-pointer
										"
									>
										<ArrowUp className="h-4 w-4" />
										<span className="sr-only">Enviar</span>
									</Button>
								</div>
							</FormControl>

							<FormMessage className="mt-2" />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};
