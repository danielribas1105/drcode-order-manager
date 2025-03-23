import { Produto } from "@core"
import { Injectable } from "@nestjs/common"
import { PrismaProvider } from "src/db/prisma.provider"

@Injectable()
export class ProdutoPrisma {
	constructor(private readonly prisma: PrismaProvider) {}

	async obterProdutos(): Promise<Produto[]> {
		return this.prisma.produto.findMany()
	}

	async obterProdutoPorId(id: string): Promise<Produto[] | null> {
		return this.prisma.produto.findUnique({
			where: { id },
		}) as any
	}
}
