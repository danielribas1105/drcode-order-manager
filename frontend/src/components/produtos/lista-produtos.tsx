import { Produto } from "@core"
import Link from "next/link"

interface ListaProdutosProps {
	produtos: Produto[]
	onExcluir?: (id: string) => void
}

export default function ListaProdutos({ produtos, onExcluir }: ListaProdutosProps) {
	return (
		<div className="w-full overflow-x-auto">
			<table className="min-w-full bg-white rounded-lg overflow-hidden">
				<thead className="bg-gray-100">
					<tr>
						<th className="text-left py-3 px-4 font-semibold text-sm">Nome</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Marca</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Peso</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Especificações</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Ações</th>
					</tr>
				</thead>
				<tbody>
					{produtos.length > 0 ? (
						produtos.map((produto) => (
							<tr key={produto.id} className="border-b hover:bg-gray-50">
								<td className="py-3 px-4">{produto.nome}</td>
								<td className="py-3 px-4">{produto.marca}</td>
								<td className="py-3 px-4">{produto.peso}</td>
								<td className="py-3 px-4">{produto.especificacoes}</td>
								<td className="py-3 px-4 flex gap-2">
									<Link
										href={`/produtos/${produto.id}`}
										className="text-blue-600 hover:text-blue-800"
									>
										Ver
									</Link>
									<Link
										href={`/produtos/edit/${produto.id}`}
										className="text-green-600 hover:text-green-800"
									>
										Editar
									</Link>
									{onExcluir && (
										<button
											onClick={() => onExcluir(produto.id)}
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
								Nenhum produto encontrado
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
