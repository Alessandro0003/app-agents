import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Schema } from "./schema";
import type { CreateRoomInput, CreateRoomOutput } from "./types";

export const useCreateRoomForm = (props: UseFormProps<CreateRoomInput> = {}) =>
	// biome-ignore lint/suspicious/noExplicitAny: use any type for the output
	useForm<CreateRoomInput, any, CreateRoomOutput>({
		resolver: zodResolver(Schema),
		...props,
	});

export interface CreateRoomFormProps
	// biome-ignore lint/suspicious/noExplicitAny: use any type for the output
	extends UseFormReturn<CreateRoomInput, any, CreateRoomOutput> {
	onSubmit: (data: CreateRoomOutput) => void;
}

export const CreateRoomForm = (props: CreateRoomFormProps) => {
	const { onSubmit, ...form } = props;

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Nome da Sala</FormLabel>
									<FormControl>
										<Input placeholder="Digite o nome da sala" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Descrição</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<Button type="submit" className="w-full">
						Criar sala
					</Button>
				</form>
			</Form>
		</div>
	);
};
