import { Pedido } from "@/core"
import CardPedido from "./card-pedido"

export interface ListaPedidosProps {
    pedidos: Pedido[]
    selecionarPedido: (pedido: Pedido) => void
    removerPedido: (pedido: Pedido) => void
}

export default function ListaPedidos(props: ListaPedidosProps) {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {props.pedidos.map((pedido: Pedido) => (
            <CardPedido 
                key={pedido.id} 
                pedido={pedido} 
                selecionarPedido={() => props.selecionarPedido(pedido)}
                removerPedido={() => props.removerPedido(pedido)}
            />
            ))}
        </div>
    )
}