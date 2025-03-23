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
}
