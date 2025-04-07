import { Injectable } from "@nestjs/common"
import { PrismaProvider } from "src/db/prisma.provider"
import { Produto } from "@core"

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

	async criarProduto(data: Omit<Produto, "id">): Promise<Produto> {
		return this.prisma.produto.create({
			data,
		})
	}

	async atualizarProduto(id: string, data: Partial<Produto>): Promise<Produto> {
		return this.prisma.produto.update({
			where: { id },
			data,
		})
	}

	async excluirProduto(id: string): Promise<Produto> {
		return this.prisma.produto.delete({
			where: { id },
		})
	}
}
