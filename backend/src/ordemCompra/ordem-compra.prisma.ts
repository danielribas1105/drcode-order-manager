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
}
