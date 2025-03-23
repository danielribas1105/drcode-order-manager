import { Pedido } from "@core"
import { Injectable } from "@nestjs/common"
import { PrismaProvider } from "src/db/prisma.provider"

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
}
