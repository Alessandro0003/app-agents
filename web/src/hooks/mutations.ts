import {
	type InvalidateQueryFilters,
	type MutationFunction,
	type MutationKey,
	type UseMutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useAlert } from "./useAlerts";

interface CreateMutationArgs<TData, TVariables> {
	key: MutationKey;
	mutationFn: MutationFunction<TData, TVariables>;
	messages?: {
		onError?: () => string;
		onMutate?: () => string;
		onSuccess?: () => string;
	};
	invalidate?: InvalidateQueryFilters<unknown[]>[];
}

export const createMutation = <TData, TVariables = void>(
	args: CreateMutationArgs<TData, TVariables>,
) => {
	const { key, mutationFn, messages, invalidate } = args;

	return (
		options?: Omit<
			UseMutationOptions<TData, unknown, TVariables, unknown>,
			"mutationFn"
		>,
	) => {
		const { onError, onSuccess, onMutate, ...config } = options || {};
		const { Alert } = useAlert();

		const queryClient = useQueryClient();

		const handleInvalidate = () => {
			invalidate?.forEach((query) => {
				queryClient.invalidateQueries(query);
			});
		};

		return useMutation({
			mutationKey: key,
			mutationFn,
			onError: (error, variables, context) => {
				onError?.(error, variables, context);

				messages?.onError &&
					Alert({
						variant: "error",
						message: messages.onError(),
					});
			},
			onMutate: (variables) => {
				onMutate?.(variables);

				messages?.onMutate &&
					Alert({
						variant: "info",
						message: messages.onMutate(),
					});
			},
			onSuccess: (data, variables, context) => {
				onSuccess?.(data, variables, context);

				handleInvalidate();

				messages?.onSuccess &&
					Alert({
						variant: "success",
						message: messages.onSuccess(),
					});
			},

			...config,
		});
	};
};
