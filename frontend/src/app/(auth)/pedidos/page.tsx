"use client"
import { useEffect, useState } from "react"
import { Pedido } from "@core"
import { pedidoService } from "@/services/pedidosService"
import { obterPedidos } from "@/functions/pedidos"
import Container from "@/components/layout/container"
import ListaPedidos from "@/components/pedidos/lista-pedidos"
import HeaderPage from "@/components/templates/header-page"

export default function PedidosPage() {
	//const listaPedidos = await obterPedidos()

	const [pedidos, setPedidos] = useState<Pedido[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function carregarPedidos() {
			console.log("carregarPedidos")
			try {
				const data = await pedidoService.obterTodos()
				setPedidos(data)
			} catch (error) {
				console.error("Erro ao carregar pedidos:", error)
			} finally {
				setLoading(false)
			}
		}

		carregarPedidos()
	}, [])

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

	if (loading) return <div>Carregando...</div>

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Pedidos Cadastradas"
				textoBtn="Adicionar Pedido"
				textofiltro={"Pesquisar Pedidos"}
			/>
			<ListaPedidos pedidos={pedidos} />
		</Container>
	)
}
