"use client"
import { OrdemCompra, Pedido, Produto, Supermercado, Usuario } from "@core"
import BtnsGroup from "../templates/btns-group"
import { pedidoService } from "@/services/pedidosService"
import { useState, useEffect } from "react"

export interface ListaPedidosProps {
	pedidos: Pedido[]
	ordensCompra: OrdemCompra[]
	produtos: Produto[]
	usuarios: Usuario[]
	supermercados: Supermercado[]
}

export default function ListaPedidos({
	pedidos: initialPedidos,
	ordensCompra,
	produtos,
	usuarios,
	supermercados,
}: ListaPedidosProps) {
	const [pedidos, setPedidos] = useState<Pedido[]>(initialPedidos)

	const handleExcluir = async (id: string) => {
		if (confirm("Tem certeza que deseja excluir este pedido?")) {
			try {
				await pedidoService.excluir(id)
				setPedidos(pedidos.filter((pedido) => pedido.id !== id))
			} catch (error) {
				console.error("Erro ao excluir pedido:", error)
			}
		}
	}

	function findProdutoOc(id: string): string {
		const oc = ordensCompra.find((oc) => {
			if (oc.id === id) return oc.produtoId
		})

		const produto = produtos.find((produto) => produto.id === oc?.produtoId)
		return produto ? produto.nome : "Produto não encontrado"
	}

	function findSupermercado(id: string): string {
		const supermercado = supermercados.find((supermercado) => supermercado.id === id)
		return supermercado ? supermercado.razaoSocial : "Supermercado não encontrado"
	}

	function findUsuario(id: string): string {
		const usuario = usuarios.find((usuario) => usuario.id === id)
		return usuario ? usuario.nome : "Usuário não encontrado"
	}

	// Atualiza o estado local se as props mudarem
	useEffect(() => {
		setPedidos(initialPedidos)
	}, [initialPedidos])

	return (
		<ul className="flex flex-col gap-2">
			{pedidos.length > 0 ? (
				pedidos.map((pedido) => (
					<li
						key={pedido.id}
						className="flex flex-col md:flex-row md:justify-between p-2 border-2 border-zinc-200 rounded-lg hover:bg-gray-50"
					>
						<div>
							<span className="font-bold text-lg py-3 px-4">
								{findProdutoOc(pedido.ordemCompraId)}
							</span>
							<div className="text-base text-zinc-400">
								<span className="py-3 px-4">{findSupermercado(pedido.supermercadoId)}</span>
								<span className="py-3 px-4">{findUsuario(pedido.usuarioId)}</span>
								<span className="py-3 px-4">{pedido.qtdeCaixas}</span>
								<span className="py-3 px-4">{pedido.data}</span>
							</div>
						</div>
						<BtnsGroup
							href="pedidos"
							objeto={pedido}
							onExcluir={handleExcluir}
							// Podemos passar informações adicionais para o BtnsGroup
							infoAdicional={{
								nomeProduto: findProdutoOc(pedido.ordemCompraId),
								nomeSupermercado: findSupermercado(pedido.supermercadoId),
								nomeUsuario: findUsuario(pedido.usuarioId),
							}}
						/>
					</li>
				))
			) : (
				<span className="py-4 px-4 text-center text-gray-500">Nenhum pedido encontrado</span>
			)}
		</ul>
	)
}
