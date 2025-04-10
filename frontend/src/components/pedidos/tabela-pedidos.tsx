import Link from "next/link"
import { Pedido } from "@core"

interface TabelaPedidosProps {
	pedidos: Pedido[]
	onExcluir?: (id: string) => void
}

export default function TabelaPedidos({ pedidos, onExcluir }: TabelaPedidosProps) {
	return (
		<div className="w-full overflow-x-auto">
			<table className="min-w-full bg-white rounded-lg overflow-hidden">
				<thead className="bg-gray-100">
					<tr>
						<th className="text-left py-3 px-4 font-semibold text-sm">Ordem Compra</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Supermercado</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Cpmprador</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Qtde Caixas</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Data</th>
					</tr>
				</thead>
				<tbody>
					{pedidos.length > 0 ? (
						pedidos.map((pedido) => (
							<tr key={pedido.id} className="border-b hover:bg-gray-50">
								<td className="py-3 px-4">{pedido.ordemCompraId}</td>
								<td className="py-3 px-4">{pedido.supermercadoId}</td>
								<td className="py-3 px-4">{pedido.usuarioId}</td>
								<td className="py-3 px-4">{pedido.qtdeCaixas}</td>
								<td className="py-3 px-4">{pedido.data}</td>
								<td className="py-3 px-4 flex gap-2">
									<Link
										href={`/pedidos/${pedido.id}`}
										className="text-blue-600 hover:text-blue-800"
									>
										Ver
									</Link>
									<Link
										href={`/pedidos/edit/${pedido.id}`}
										className="text-green-600 hover:text-green-800"
									>
										Editar
									</Link>
									{onExcluir && (
										<button
											onClick={() => onExcluir(pedido.id)}
											className="text-red-600 hover:text-red-800"
										>
											Excluir
										</button>
									)}
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={6} className="py-4 px-4 text-center text-gray-500">
								Nenhum pedido encontrado
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
