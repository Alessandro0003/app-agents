import type { JSX } from "react";
import type { Room } from "../schemas";
import { useBoolean } from "@/hooks/useBoolean";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteRoom } from "../hooks/mutation";


interface DeleteRoomContainersProps {
  reenderTrigger: (onOpen: () => void) => JSX.Element;
  roomId: Room['id'];
}

export const DeleteRoomContainers = (props: DeleteRoomContainersProps) => {
  const { reenderTrigger, roomId } = props

  const { value: isOpen, onTrue: onOpen, onFalse: onClose } = useBoolean()

  const { mutate: delte } = useDeleteRoom({ 
    onSuccess: () => {
      onClose()
    }
  })

  const handleDelete = () => {
    delte({
      roomId
    })
  }

  return (
    <>
      {reenderTrigger(onOpen)}
      <AlertDialog open={isOpen} onOpenChange={onClose}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Deseja Remover a sala ?</AlertDialogTitle>
						<AlertDialogDescription>
							Caso queira remover a sala, clique em confirmar.
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<Button variant="outline" onClick={onClose}>
							Cancelar
						</Button>
						<Button onClick={handleDelete}>Confirmar</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
    </>
  )
}