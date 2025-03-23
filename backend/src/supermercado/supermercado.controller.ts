import { Controller, Get, Param } from "@nestjs/common"
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
}
