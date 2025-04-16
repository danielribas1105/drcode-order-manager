import { useEffect, useState } from "react"
import { OrdemCompra, Pedido, Produto } from "@core"
import { Moeda } from "@/utils"
import BtnsGroup from "../templates/btns-group"
import BtnsPedidoOc from "./btns-pedido-oc"
import { pedidoService } from "@/services/pedidosService"

export interface ListaOrdensCompraProps {
	ordensCompra: OrdemCompra[]
	produtos: Produto[]
	onExcluir?: (id: string) => void
}

export default function ListaOrdensCompra({ ordensCompra, produtos, onExcluir }: ListaOrdensCompraProps) {
	const [pedidos, setPedidos] = useState<Pedido[]>([])

	useEffect(() => {
		async function carregarPedidos() {
			try {
				const data = await pedidoService.obterTodos()
				setPedidos(data)
			} catch (error) {
				console.error("Erro ao carregar pedidos em lista-ordens-compra:", error)
			}
		}
		carregarPedidos()
	})

	function obterProduto(id: string): Partial<Produto | null> {
		const produtoEncontrado = produtos.find((produto) => produto.id === id)
		if (produtoEncontrado) {
			return produtoEncontrado
		}
		return null
	}

	function totalPedidosOc(id: string): number {
		const totalPedidos = pedidos.filter((p) => {
			p.ordemCompraId === id
		})
		console.log(totalPedidos.length)
		return totalPedidos.length
	}

	return (
		<ul className="flex flex-col gap-2">
			{ordensCompra.length > 0 ? (
				ordensCompra.map((oc) => (
					<li
						key={oc.id}
						className="flex flex-col md:flex-row md:justify-between py-3 px-4 border-2 border-zinc-200 rounded-lg hover:bg-gray-50"
					>
						<div className="pl-4">
							<div className="flex gap-4 font-bold text-lg">
								<span className="text-zinc-800">{obterProduto(oc.produtoId)?.nome}</span>
								<span className="text-logo-blue-dark">{Moeda.formatar(oc.preco)}</span>
								<span className="text-logo-blue-dark">{oc.qtdeCaixasPallet} cx/pallet</span>
							</div>
							<div className="flex gap-3 text-base text-zinc-400">
								<span className="">{oc.data}</span>
								<span className="">Prazo: {oc.prazo} dias</span>
								<span className="">{oc.qtdePallets} pallets</span>
								<span className="">Entrega: {oc.entrega}</span>
							</div>
							<div className="flex gap-3 font-semibold text-zinc-600">
								<div className="flex gap-3">
									<span>Total de pedidos:</span>
									<span>{totalPedidosOc(oc.id)}</span>
								</div>
								<div className="flex gap-3">
									<span>Qtde de caixas: 230</span>
									<span>Qtde de caixas: 230</span>
								</div>
							</div>
						</div>
						<div className="flex">
							<BtnsPedidoOc />
							<BtnsGroup href="ordensCompra" objeto={oc.id} onExcluir={onExcluir} />
						</div>
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
