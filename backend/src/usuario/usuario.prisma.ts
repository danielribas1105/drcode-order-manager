import { Usuario } from "@core"
import { Injectable } from "@nestjs/common"
import { PrismaProvider } from "src/db/prisma.provider"

@Injectable()
export class UsuarioPrisma {
	constructor(private readonly prisma: PrismaProvider) {}

	async obterUsuarios(): Promise<Usuario[]> {
		return this.prisma.usuario.findMany()
	}

	async obterUsuarioPorId(id: string): Promise<Usuario[] | null> {
		return this.prisma.usuario.findUnique({
			where: { id },
		}) as any
	}

	async criarUsuario(data: Omit<Usuario, "id">): Promise<Usuario> {
		return this.prisma.usuario.create({
			data,
		})
	}

	async atualizarUsuario(id: string, data: Partial<Usuario>): Promise<Usuario> {
		return this.prisma.usuario.update({
			where: { id },
			data,
		})
	}

	async excluirUsuario(id: string): Promise<Usuario> {
		return this.prisma.usuario.delete({
			where: { id },
		})
	}
}
