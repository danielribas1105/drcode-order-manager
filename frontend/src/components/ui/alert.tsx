"use client"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AlertProps {
	titulo: string
	texto: string
	cancel?: boolean
	ok?: boolean
	open: boolean
	onOpenChange: (open: boolean) => void
}

export default function Alert({ titulo, texto, cancel = true, ok = true, open, onOpenChange }: AlertProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{titulo}</AlertDialogTitle>
					<AlertDialogDescription>{texto}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					{cancel && <AlertDialogCancel>Cancelar</AlertDialogCancel>}
					{ok && (
						<AlertDialogAction className="bg-blue-600 hover:bg-blue-700">OK</AlertDialogAction>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
