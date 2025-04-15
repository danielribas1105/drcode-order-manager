"use client"
import { Pedido } from "@core"
import BtnsGroup from "../templates/btns-group"
import { pedidoService } from "@/services/pedidosService"

export interface ListaPedidosProps {
	pedidos: Pedido[]
	/* onExcluir?: (id: string) => void */
}

export default function ListaPedidos({ pedidos }: ListaPedidosProps) {

	const handleExcluir = async (id: string) => {
		if (confirm("Tem certeza que deseja excluir este pedido?")) {
			try {
				await pedidoService.excluir(id)
				//setPedidos(pedidos.filter((pedido) => pedido.id !== id))
			} catch (error) {
				console.error("Erro ao excluir pedido:", error)
			}
		}
	}
		
	return (
		<ul className="flex flex-col gap-2">
			{pedidos.length > 0 ? (
				pedidos.map((pedido) => (
					<li
						key={pedido.id}
						className="flex flex-col md:flex-row md:justify-between p-2 border-2 border-zinc-200 rounded-lg hover:bg-gray-50"
					>
						<div>
							<span className="font-bold text-lg py-3 px-4">{pedido.ordemCompraId}</span>
							<div className="text-base text-zinc-400">
								<span className="py-3 px-4">{pedido.supermercadoId}</span>
								<span className="py-3 px-4">{pedido.usuarioId}</span>
								<span className="py-3 px-4">{pedido.qtdeCaixas}</span>
								<span className="py-3 px-4">{pedido.data}</span>
							</div>
						</div>
						<BtnsGroup href="pedidos" objetoId={pedido.id} onExcluir={handleExcluir} />
					</li>
				))
			) : (
				<span className="py-4 px-4 text-center text-gray-500">Nenhum pedido encontrado</span>
			)}
		</ul>
	)
}
