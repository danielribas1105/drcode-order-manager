import { Controller, Get, Param } from "@nestjs/common"
import { ProdutoPrisma } from "./produto.prisma"
import { Produto } from "@core"

@Controller("produtos")
export class ProdutoController {
	constructor(private readonly repo: ProdutoPrisma) {}

	@Get()
	async obterProdutos(): Promise<Produto[]> {
		return this.repo.obterProdutos()
	}

	@Get(":id")
	async obterOrdemPorId(@Param("id") id: string): Promise<Produto[] | null> {
		return this.repo.obterProdutoPorId(id)
	}
}
