import { Pedido } from "@core"
import { httpGet } from "./api"

export async function obterPedidos() {
	const pedidos: Pedido[] = await httpGet("/pedidos")

	return {
		allPedidos: pedidos,
		get destaques() {
			return pedidos.filter((pedido) => pedido.id)
		},
	}
}
