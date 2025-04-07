import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { SupermercadoPrisma } from "./supermercado.prisma"
import { Supermercado } from "@core"

@Controller("supermercados")
export class SupermercadoController {
	constructor(private readonly repo: SupermercadoPrisma) {}

	@Get()
	async obterSupermercado(): Promise<Supermercado[]> {
		return this.repo.obterSupermercados()
	}

	@Get(":id")
	async obterOrdemPorId(@Param("id") id: string): Promise<Supermercado[] | null> {
		return this.repo.obterSupermercadoPorId(id)
	}

	@Post()
	async criar(@Body() data: Omit<Supermercado, "id">) {
		return this.repo.criarSupermercado(data)
	}

	@Put(":id")
	async atualizar(@Param("id") id: string, @Body() data: Partial<Supermercado>) {
		return this.repo.atualizarSupermercado(id, data)
	}

	@Delete(":id")
	async excluir(@Param("id") id: string) {
		return this.repo.excluirSupermercado(id)
	}
}
