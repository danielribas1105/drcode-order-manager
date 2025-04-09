import Link from "next/link"
import { Supermercado } from "@core"

export interface ListaSupermercadosProps {
	supermercados: Supermercado[]
	onExcluir?: (id: string) => void
}

export default function ListaSupermercados({ supermercados, onExcluir }: ListaSupermercadosProps) {
	return (
		<div className="w-full overflow-x-auto">
			<table className="min-w-full bg-white rounded-lg overflow-hidden">
				<thead className="bg-gray-100">
					<tr>
						<th className="text-left py-3 px-4 font-semibold text-sm">Razão Social</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">CNPJ</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Comprador</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Ações</th>
					</tr>
				</thead>
				<tbody>
					{supermercados.length > 0 ? (
						supermercados.map((supermercado) => (
							<tr key={supermercado.id} className="border-b hover:bg-gray-50">
								<td className="py-3 px-4">{supermercado.razaoSocial}</td>
								<td className="py-3 px-4">{supermercado.cnpj}</td>
								<td className="py-3 px-4">{supermercado.usuarioId}</td>
								<td className="py-3 px-4">{supermercado.status}</td>
								<td className="py-3 px-4 flex gap-2">
									<Link
										href={`/supermercados/${supermercado.id}`}
										className="text-blue-600 hover:text-blue-800"
									>
										Ver
									</Link>
									<Link
										href={`/supermercados/edit/${supermercado.id}`}
										className="text-green-600 hover:text-green-800"
									>
										Editar
									</Link>
									{onExcluir && (
										<button
											onClick={() => onExcluir(supermercado.id)}
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
								Nenhum supermercado encontrado
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
