import axios from "axios"
import { Pedido } from "@core"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export const pedidoService = {
	obterTodos: async (): Promise<Pedido[]> => {
		console.log(`${API_URL}pedidos`)
		const response = await axios.get<Pedido[]>(`${API_URL}pedidos`)
		return response.data
	},

	obterPorId: async (id: string): Promise<Pedido> => {
		const response = await axios.get<Pedido>(`${API_URL}pedidos/${id}`)
		return response.data
	},

	criar: async (data: Omit<Pedido, "id">): Promise<Pedido> => {
		const response = await axios.post<Pedido>(`${API_URL}pedidos`, data)
		return response.data
	},

	atualizar: async (id: string, data: Partial<Pedido>): Promise<Pedido> => {
		const response = await axios.put<Pedido>(`${API_URL}pedidos/${id}`, data)
		return response.data
	},

	excluir: async (id: string): Promise<void> => {
		await axios.delete(`${API_URL}pedidos/${id}`)
	},
}
