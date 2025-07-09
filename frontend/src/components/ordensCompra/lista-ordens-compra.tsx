"use client"
import { useEffect, useState } from "react"
import { OrdemCompra, Pedido, Produto } from "@core"
import { ordemCompraService } from "@/services/ordensCompraService"
import { Moeda } from "@/utils"
import BtnsGroup from "../templates/btns-group"
import BtnsPedidoOc from "./btns-pedido-oc"

export interface ListaOrdensCompraProps {
	ordensCompra: OrdemCompra[]
	produtos: Produto[]
	pedidos: Pedido[]
}

export default function ListaOrdensCompra({
	ordensCompra: initialOrdensCompra,
	produtos,
	pedidos,
}: ListaOrdensCompraProps) {
	const [ordensCompra, setOrdensCompra] = useState<OrdemCompra[]>(initialOrdensCompra)

	function obterProduto(id: string): Partial<Produto | null> {
		const produtoEncontrado = produtos.find((produto) => produto.id === id)
		if (produtoEncontrado) {
			return produtoEncontrado
		}
		return null
	}

	function totalPedidosOc(id: string): number {
		const totalPedidos = pedidos.filter((p) => p.ordemCompraId === id)
		return totalPedidos.length
	}

	function totalCaixasPedidosOc(id: string): number {
		let totalCaixas = 0
		const totalPedidos = pedidos.filter((p) => p.ordemCompraId === id)
		totalPedidos.forEach((pedido) => {
			totalCaixas += pedido.qtdeCaixas
		})
		return totalCaixas
	}

	const handleExcluir = async (id: string) => {
		if (confirm("Tem certeza que deseja excluir esta ordem de compra?")) {
			try {
				await ordemCompraService.excluir(id)
				setOrdensCompra(ordensCompra.filter((ordem) => ordem.id !== id))
			} catch (error) {
				console.error("Erro ao excluir ordem de compra:", error)
			}
		}
	}

	// Atualiza o estado local se as props mudarem
	useEffect(() => {
		setOrdensCompra(initialOrdensCompra)
	}, [initialOrdensCompra])

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
									<span className="text-blue-500">{totalPedidosOc(oc.id)}</span>
								</div>
								<div className="flex gap-3">
									<span>Qtde de caixas:</span>
									<span className="text-emerald-500">{totalCaixasPedidosOc(oc.id)}</span>
								</div>
								<div className="flex gap-3">
									<span>Qtde de caixas restantes:</span>
									<span className="text-red-600">
										{oc.qtdeCaixasPallet * oc.qtdePallets - totalCaixasPedidosOc(oc.id)}
									</span>
								</div>
							</div>
						</div>
						<div className="flex">
							{/* <BtnsPedidoOc /> */}
							<BtnsGroup href="ordensCompra" objeto={oc} onExcluir={handleExcluir} />
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
