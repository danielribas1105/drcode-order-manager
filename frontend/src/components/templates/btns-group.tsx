import Link from "next/link"
import { IconEye, IconPencil, IconX } from "@tabler/icons-react"

export interface BtnsGroupProps {
	href: string
	objeto?: any // Poderia ser tipado mais especificamente se necessário
	infoAdicional?: any // Informações adicionais que podem ser úteis para o componente
	onExcluir?: (id: string) => void
}

export default function BtnsGroup({ href, objeto, infoAdicional, onExcluir }: BtnsGroupProps) {
	// Codifica os dados adicionais como parâmetros de URL
	const encodeInfoAdicional = () => {
		if (!infoAdicional) return ""

		// Transformar o objeto em parâmetros de URL
		const params = new URLSearchParams()

		// Adicionar cada propriedade de infoAdicional aos parâmetros
		Object.entries(infoAdicional).forEach(([key, value]) => {
			params.append(key, value as string)
		})

		return `?${params.toString()}`
	}

	const urlParams = encodeInfoAdicional()

	return (
		<div className="flex items-center gap-2">
			<Link
				href={`/${href}/${objeto.id}${urlParams}`}
				className="flex gap-1 text-blue-600 hover:bg-blue-600 hover:text-white py-1 px-2 border-2 border-blue-600 rounded-md"
			>
				<IconEye />
				Ver
			</Link>
			<Link
				href={`/${href}/edit/${objeto.id}${urlParams}`}
				className="flex gap-1 text-green-600 hover:bg-green-600 hover:text-white py-1 px-2 border-2 border-green-600 rounded-md"
			>
				<IconPencil />
				Editar
			</Link>
			{onExcluir && (
				<button
					onClick={() => onExcluir(objeto.id)}
					className="flex gap-1 text-red-600 hover:bg-red-600 hover:text-white py-1 px-2 border-2 border-red-600 rounded-md"
				>
					<IconX />
					Excluir
				</button>
			)}
		</div>
	)
}
