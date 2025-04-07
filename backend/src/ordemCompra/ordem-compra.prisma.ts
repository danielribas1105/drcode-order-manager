import { OrdemCompra } from "@core"
import { Injectable } from "@nestjs/common"
import { PrismaProvider } from "src/db/prisma.provider"

@Injectable()
export class OrdemCompraPrisma {
	constructor(private readonly prisma: PrismaProvider) {}

	async obterOrdensCompra(): Promise<OrdemCompra[]> {
		return this.prisma.ordemCompra.findMany()
	}

	async obterOrdemPorId(id: string): Promise<OrdemCompra[] | null> {
		return this.prisma.ordemCompra.findUnique({
			where: { id },
		}) as any
	}

	async criarOrdemCompra(data: Omit<OrdemCompra, "id">): Promise<OrdemCompra> {
		return this.prisma.ordemCompra.create({
			data,
		})
	}

	async atualizarOrdemCompra(id: string, data: Partial<OrdemCompra>): Promise<OrdemCompra> {
		return this.prisma.ordemCompra.update({
			where: { id },
			data,
		})
	}

	async excluirOrdemCompra(id: string): Promise<OrdemCompra> {
		return this.prisma.ordemCompra.delete({
			where: { id },
		})
	}
}
