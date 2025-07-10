"use client"
import Container from "@/components/layout/container"
import ListaPedidos from "@/components/pedidos/lista-pedidos"
import HeaderPage from "@/components/templates/header-page"
import { ordemCompraService } from "@/services/ordensCompraService"
import { pedidoService } from "@/services/pedidosService"
import { produtoService } from "@/services/produtosService"
import { supermercadoService } from "@/services/supermercadosService"
import { usuarioService } from "@/services/usuariosService"
import { OrdemCompra, Pedido, Produto, Supermercado, Usuario } from "@core"
import { useEffect, useState } from "react"

export default function PedidosPage() {
	const [usuarios, setUsuarios] = useState<Usuario[]>([])
	const [produtos, setProdutos] = useState<Produto[]>([])
	const [supermercados, setSupermercados] = useState<Supermercado[]>([])
	const [ordensCompra, setOrdensCompra] = useState<OrdemCompra[]>([])
	const [pedidos, setPedidos] = useState<Pedido[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function carregarDados() {
			try {
				const [usuariosRes, produtosRes, supermercadosRes, ordensRes, pedidosRes] = await Promise.all(
					[
						usuarioService.obterTodos(),
						produtoService.obterTodos(),
						supermercadoService.obterTodos(),
						ordemCompraService.obterTodas(),
						pedidoService.obterTodos(),
					]
				)
				setUsuarios(usuariosRes)
				setProdutos(produtosRes)
				setSupermercados(supermercadosRes)
				setOrdensCompra(ordensRes)
				setPedidos(pedidosRes)
			} catch (error) {
				console.error("Erro ao carregar dados:", error)
			} finally {
				setLoading(false)
			}
		}

		carregarDados()
	}, [])

	if (loading) return <div className="text-center p-4">Carregando...</div>

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Pedidos Cadastrados"
				textofiltro={"Pesquisar Pedidos"}
				textoBtn="Adicionar Pedido"
				linkBtn="/pedidos/add"
			/>
			<ListaPedidos
				pedidos={pedidos}
				ordensCompra={ordensCompra}
				produtos={produtos}
				usuarios={usuarios}
				supermercados={supermercados}
				setPedidos={setPedidos}
			/>
		</Container>
	)
}
