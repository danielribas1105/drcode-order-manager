import { Pedido } from "@core"
import CardPedido from "./card-pedido"

export interface ListaPedidosProps {
	pedidos: Pedido[]
}

export default function ListaPedidos(props: ListaPedidosProps) {
	// Garantir que é um array antes de usar .map()
	const pedidosArray = Array.isArray(props.pedidos) ? props.pedidos : []

	return pedidosArray ? (
		<div className="flex flex-wrap justify-center gap-4">
			{pedidosArray.map((pedido: Pedido) => (
				<CardPedido key={pedido.id} pedido={pedido} />
			))}
		</div>
	) : null
}
