import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
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

	@Post()
	async criar(@Body() data: Omit<Usuario, "id">) {
		return this.repo.criarUsuario(data)
	}

	@Put(":id")
	async atualizar(@Param("id") id: string, @Body() data: Partial<Usuario>) {
		return this.repo.atualizarUsuario(id, data)
	}

	@Delete(":id")
	async excluir(@Param("id") id: string) {
		return this.repo.excluirUsuario(id)
	}
}
