import { useState } from "react"
import { OrdemCompra, Produto } from "@core"
import BtnsGroup from "../templates/btns-group"

export interface ListaOrdensCompraProps {
	ordensCompra: OrdemCompra[]
	produtos: Produto[]
	onExcluir?: (id: string) => void
}

export default function ListaOrdensCompra({ ordensCompra, produtos, onExcluir }: ListaOrdensCompraProps) {
	const [loading, setLoading] = useState(true)

	function obterProduto(id: string): Partial<Produto | null> {
		const produtoEncontrado = produtos.find((produto) => produto.id === id)
		if (produtoEncontrado) {
			return produtoEncontrado
		}
		return null
	}

	return (
		<ul className="flex flex-col gap-2">
			{ordensCompra.length > 0 ? (
				ordensCompra.map((oc) => (
					<li
						key={oc.id}
						className="flex flex-col md:flex-row md:justify-between p-2 border-2 border-zinc-200 rounded-lg hover:bg-gray-50"
					>
						<div>
							<span className="font-bold text-lg py-3 px-4">
								{obterProduto(oc.produtoId)?.nome}
							</span>
							<div className="text-base text-zinc-400">
								<span className="py-3 px-4">{oc.data}</span>
								<span className="py-3 px-4">{oc.preco}</span>
								<span className="py-3 px-4">{oc.prazo}</span>
								<span className="py-3 px-4">{oc.data}</span>
								<span className="py-3 px-4">{oc.qtdeCaixasPallet}</span>
								<span className="py-3 px-4">{oc.qtdePallets}</span>
								<span className="py-3 px-4">{oc.entrega}</span>
							</div>
						</div>
						<BtnsGroup href="ordensCompra" objetoId={oc.id} onExcluir={onExcluir} />
					</li>
				))
			) : (
				<span className="py-4 px-4 text-center text-gray-500">
					Nenhuma ordem de compra encontrada
				</span>
			)}
		</ul>
	)
}
