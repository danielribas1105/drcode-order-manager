
import { useEffect, useState } from "react"
import { Pedido } from "@core"
import { pedidoService } from "@/services/pedidosService"
import Container from "@/components/layout/container"
import ListaPedidos from "@/components/pedidos/lista-pedidos"
import HeaderPage from "@/components/templates/header-page"

export default async function PedidosPage() {
	//const [pedidos, setPedidos] = useState<Pedido[]>([])
	//const [loading, setLoading] = useState(true)

	const data = await pedidoService.obterTodos()
	/* useEffect(() => {
		async function carregarPedidos() {
			console.log("carregarPedidos")
			try {
				setPedidos(data)
			} catch (error) {
				console.error("Erro ao carregar pedidos:", error)
			} finally {
				setLoading(false)
			}
		} 

		carregarPedidos()
	}, [])*/

	

	//if (loading) return <div>Carregando...</div>

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Pedidos Cadastradas"
				textofiltro={"Pesquisar Pedidos"}
				textoBtn="Adicionar Pedido"
				linkBtn="/pedidos/add"
			/>
			<ListaPedidos pedidos={data} />
		</Container>
	)
}
