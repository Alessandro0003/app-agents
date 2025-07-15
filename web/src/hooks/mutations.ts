import {
  type InvalidateQueryFilters,
  type MutationFunction,
  type MutationKey,
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useAlert } from './useAlerts'

// import type { TFunction } from 'i18next'
// import { useTranslation } from 'react-i18next'

interface CreateMutationArgs<TData, TVariables> {
  key: MutationKey
  mutationFn: MutationFunction<TData, TVariables>
  messages?: {
    onError?: () => string
    onMutate?: () => string
    onSuccess?: () => string
  }
  invalidate?: InvalidateQueryFilters<readonly unknown[]>[]
}

export function useCreateMutation<TData, TVariables = unknown>(
  args: CreateMutationArgs<TData, TVariables>,
  defaultOptions?: Omit<
    UseMutationOptions<TData, unknown, TVariables>,
    'mutationFn'
  >
) {
  const { key, mutationFn, messages, invalidate } = args

  // const { t } = useTranslation()
  const { Alert } = useAlert()
  const queryClient = useQueryClient()

  const handleInvalidate = () => {
    // biome-ignore lint/complexity/noForEach: to use mutations
    // biome-ignore lint/nursery/useIterableCallbackReturn: to use mutations
    invalidate?.forEach((query) => {
      return queryClient.invalidateQueries(query)
    })
  }

  return useMutation<TData, unknown, TVariables>({
    mutationKey: key,
    mutationFn,
    onError: (error, variables, context) => {
      defaultOptions?.onError?.(error, variables, context)
      messages?.onError &&
        Alert({
          variant: 'error',
          message: messages.onError(),
        })
    },
    onMutate: (variables) => {
      defaultOptions?.onMutate?.(variables)
      messages?.onMutate &&
        Alert({
          variant: 'info',
          message: messages.onMutate(),
        })
    },
    onSuccess: (data, variables, context) => {
      defaultOptions?.onSuccess?.(data, variables, context)
      handleInvalidate()
      messages?.onSuccess &&
        Alert({
          variant: 'success',
          message: messages.onSuccess(),
        })
    },
    ...defaultOptions,
  })
}
