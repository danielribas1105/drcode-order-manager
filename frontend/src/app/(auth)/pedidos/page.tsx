import Container from "@/components/layout/container"
import ListaPedidos from "@/components/pedidos/lista-pedidos"
import { obterPedidos } from "@/functions/pedidos"

export default async function PedidosPage() {
	const listaPedidos = await obterPedidos()
	return (
		<Container className="flex-col">
			<ListaPedidos pedidos={listaPedidos.allPedidos} />
		</Container>
	)
}
