import { Controller, Get, Param } from "@nestjs/common"
import { UsuarioPrisma } from "./usuario.prisma"
import { Usuario } from "@core"

@Controller("usuarios")
export class UsuarioController {
	constructor(private readonly repo: UsuarioPrisma) {}

	@Get()
	async obterUsuarios(): Promise<Usuario[]> {
		return this.repo.obterUsuarios()
	}

	@Get(":id")
	async obterOrdemPorId(@Param("id") id: string): Promise<Usuario[] | null> {
		return this.repo.obterUsuarioPorId(id)
	}
}
