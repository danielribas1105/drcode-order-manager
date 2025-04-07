import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { OrdemCompraPrisma } from "./ordem-compra.prisma"
import { OrdemCompra } from "@core"

@Controller("ordens_compra")
export class OrdemCompraController {
	constructor(private readonly repo: OrdemCompraPrisma) {}

	@Get()
	async obterOrdensCompra(): Promise<OrdemCompra[]> {
		console.log(this.repo.obterOrdensCompra())
		return this.repo.obterOrdensCompra()
	}

	@Get(":id")
	async obterOrdemPorId(@Param("id") id: string): Promise<OrdemCompra[] | null> {
		return this.repo.obterOrdemPorId(id)
	}

	@Post()
	async criar(@Body() data: Omit<OrdemCompra, "id">) {
		return this.repo.criarOrdemCompra(data)
	}

	@Put(":id")
	async atualizar(@Param("id") id: string, @Body() data: Partial<OrdemCompra>) {
		return this.repo.atualizarOrdemCompra(id, data)
	}

	@Delete(":id")
	async excluir(@Param("id") id: string) {
		return this.repo.excluirOrdemCompra(id)
	}
}
