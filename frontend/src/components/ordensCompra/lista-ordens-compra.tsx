import { OrdemCompra, Produto } from "@core"
import BtnsGroup from "../templates/btns-group"
import { useEffect, useState } from "react"
import { produtoService } from "@/services/produtosService"

export interface ListaOrdensCompraProps {
	ordensCompra: OrdemCompra[]
	onExcluir?: (id: string) => void
}

export default function ListaPedidos({ ordensCompra, onExcluir }: ListaOrdensCompraProps) {
	const [produtos, setProdutos] = useState<Produto[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function carregarProdutos() {
			try {
				const data = await produtoService.obterTodos()
				setProdutos(data)
			} catch (error) {
				console.error("Erro ao carregar produtos em lista-ordens-compra:", error)
			} finally {
				setLoading(false)
			}
		}
		carregarProdutos()
	})

	function obterNomeProduto(id: string): string {
		const produtoEncontrado = produtos.find((produto) => produto.id === id)
		if (produtoEncontrado) {
			return produtoEncontrado.nome
		}
		return "Produto sem nome cadastrado"
	}

	if (loading) return <div>Carregando OCs...</div>

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
								{obterNomeProduto(oc.produtoId)}
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
