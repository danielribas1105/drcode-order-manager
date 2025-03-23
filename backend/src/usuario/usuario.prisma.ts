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
}
