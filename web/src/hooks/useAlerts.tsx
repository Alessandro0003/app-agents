import { useSnackbar, type VariantType } from 'notistack'
import { useMemo } from 'react'

interface AlertArgs {
  variant: VariantType
  message: string
  hideDuration?: number
  anchorOrigin?: {
    horizontal: 'right' | 'left' | 'center'
    vertical: 'top' | 'bottom'
  }
}

export const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar()

  const Alert = (args: AlertArgs) => {
    const { variant, message, hideDuration, anchorOrigin } = args

    enqueueSnackbar(message, {
      anchorOrigin: {
        horizontal: anchorOrigin ? anchorOrigin.horizontal : 'right',
        vertical: anchorOrigin ? anchorOrigin.vertical : 'bottom',
      },
      variant,
      autoHideDuration: hideDuration ?? 3000,
      preventDuplicate: true,
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: useMemo is used
  const exports = useMemo(
    () => ({
      Alert,
    }),
    []
  )

  return exports
}
