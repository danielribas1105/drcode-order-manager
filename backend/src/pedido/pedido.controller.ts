import { Controller, Get, Param } from "@nestjs/common"
import { PedidoPrisma } from "./pedido.prisma"
import { Pedido } from "@core"

@Controller("pedidos")
export class PedidoController {
	constructor(private readonly repo: PedidoPrisma) {}

	@Get()
	async obterPedidos(): Promise<Pedido[]> {
		return this.repo.obterPedidos()
	}

	@Get(":id")
	async obterOrdemPorId(@Param("id") id: string): Promise<Pedido[] | null> {
		return this.repo.obterPedidoPorId(id)
	}

	@Get("oc/:id")
	async obterPedidosByOrdemCompra(@Param("id") id: string): Promise<Pedido[] | null> {
		console.log("controller " + id)
		return this.repo.obterPedidosByOrdemCompra(id)
	}
}
