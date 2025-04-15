import Link from "next/link"
import { IconCancel, IconEye, IconPencil } from "@tabler/icons-react"

export interface BtnsGroupProps {
	href: string
	objetoId: string
	onExcluir?: (id: string) => void
}

export default function BtnsGroup({ href, objetoId, onExcluir }: BtnsGroupProps) {
	return (
		<div className="py-3 pr-4 flex items-center gap-2">
			<Link
				href={`/${href}/${objetoId}`}
				className="flex gap-1 text-blue-600 hover:bg-blue-600 hover:text-white py-1 px-2 border-2 border-blue-600 rounded-md"
			>
				<IconEye />
				Ver
			</Link>
			<Link
				href={`/${href}/edit/${objetoId}`}
				className="flex gap-1 text-green-600 hover:bg-green-600 hover:text-white py-1 px-2 border-2 border-green-600 rounded-md"
			>
				<IconPencil />
				Editar
			</Link>
			{onExcluir && (
				<button
					onClick={() => onExcluir(objetoId)}
					className="flex gap-1 text-red-600 hover:bg-red-600 hover:text-white py-1 px-2 border-2 border-red-600 rounded-md"
				>
					<IconCancel />
					Excluir
				</button>
			)}
		</div>
	)
}
