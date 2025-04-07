import { Injectable } from "@nestjs/common"
import { PrismaProvider } from "src/db/prisma.provider"
import { Pedido } from "@core"

@Injectable()
export class PedidoPrisma {
	constructor(private readonly prisma: PrismaProvider) {}

	async obterPedidos(): Promise<Pedido[]> {
		return this.prisma.pedido.findMany()
	}

	async obterPedidoPorId(id: string): Promise<Pedido[] | null> {
		return this.prisma.pedido.findUnique({
			where: { id },
		}) as any
	}

	async obterPedidosByOrdemCompra(id: string): Promise<Pedido[]> {
		console.log("provider " + id)
		return this.prisma.pedido.findMany({
			where: { ordemCompraId: id },
		})
	}

	async criarPedido(data: Omit<Pedido, "id">): Promise<Pedido> {
		return this.prisma.pedido.create({
			data,
		})
	}

	async atualizarPedido(id: string, data: Partial<Pedido>): Promise<Pedido> {
		return this.prisma.pedido.update({
			where: { id },
			data,
		})
	}

	async excluirPedido(id: string): Promise<Pedido> {
		return this.prisma.pedido.delete({
			where: { id },
		})
	}
}
