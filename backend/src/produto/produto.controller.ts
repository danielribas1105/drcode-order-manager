import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
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

	@Post()
	async criar(@Body() data: Omit<Produto, "id">) {
		return this.repo.criarProduto(data)
	}

	@Put(":id")
	async atualizar(@Param("id") id: string, @Body() data: Partial<Produto>) {
		return this.repo.atualizarProduto(id, data)
	}

	@Delete(":id")
	async excluir(@Param("id") id: string) {
		return this.repo.excluirProduto(id)
	}
}
