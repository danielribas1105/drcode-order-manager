import Container from "@/components/layout/container"
import ListaPedidos from "@/components/pedidos/lista-pedidos"
import HeaderPage from "@/components/templates/header-page"
import { obterPedidos } from "@/functions/pedidos"

export default async function PedidosPage() {
	const listaPedidos = await obterPedidos()
	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Pedidos Cadastradas"
				textoBtn="Adicionar Pedido"
				textofiltro={"Pesquisar Pedidos"}
			/>
			<ListaPedidos pedidos={listaPedidos.allPedidos} />
		</Container>
	)
}
