import Link from "next/link"
import { IconDashboard, IconPlus } from "@tabler/icons-react"

export default function BtnsPedidoOc() {
	return (
		<div className="py-3 pr-2 flex items-center gap-2">
			<Link
				href={`/pedidos/add`}
				className="flex gap-2 text-amber-600 hover:bg-amber-600 hover:text-white py-1 px-3 border-2 border-amber-600 rounded-md"
			>
				<IconPlus />
				Pedido
			</Link>
			<Link
				href={`/relatorios`}
				className="flex gap-2 text-violet-600 hover:bg-violet-600 hover:text-white py-1 px-3 border-2 border-violet-600 rounded-md"
			>
				<IconDashboard />
				Fechar OC
			</Link>
		</div>
	)
}
