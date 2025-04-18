import { Supermercado } from "@core"
import { Injectable } from "@nestjs/common"
import { PrismaProvider } from "src/db/prisma.provider"

@Injectable()
export class SupermercadoPrisma {
	constructor(private readonly prisma: PrismaProvider) {}

	async obterSupermercados(): Promise<Supermercado[]> {
		return this.prisma.supermercado.findMany()
	}

	async obterSupermercadoPorId(id: string): Promise<Supermercado[] | null> {
		return this.prisma.supermercado.findUnique({
			where: { id },
		}) as any
	}

	async criarSupermercado(data: Omit<Supermercado, "id">): Promise<Supermercado> {
		return this.prisma.supermercado.create({
			data,
		})
	}

	async atualizarSupermercado(id: string, data: Partial<Supermercado>): Promise<Supermercado> {
		return this.prisma.supermercado.update({
			where: { id },
			data,
		})
	}

	async excluirSupermercado(id: string): Promise<Supermercado> {
		return this.prisma.supermercado.delete({
			where: { id },
		})
	}
}
