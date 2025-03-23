import { Controller, Get, Param } from "@nestjs/common"
import { OrdemCompraPrisma } from "./ordem-compra.prisma"
import { OrdemCompra } from "@core"

@Controller("ordens_compra")
export class OrdemCompraController {
	constructor(private readonly repo: OrdemCompraPrisma) {}

	@Get()
	async obterOrdensCompra(): Promise<OrdemCompra[]> {
		return this.repo.obterOrdensCompra()
	}

	@Get(":id")
	async obterOrdemPorId(@Param("id") id: string): Promise<OrdemCompra[] | null> {
		return this.repo.obterOrdemPorId(id)
	}
}
