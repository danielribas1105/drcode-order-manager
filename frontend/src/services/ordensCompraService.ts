import axios from "axios"
import { OrdemCompra } from "@core"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export const ordemCompraService = {
	obterTodas: async (): Promise<OrdemCompra[]> => {
		const response = await axios.get<OrdemCompra[]>(`${API_URL}ordens_compra`)
		console.log("response " + response)
		return response.data
	},

	obterPorId: async (id: string): Promise<OrdemCompra> => {
		const response = await axios.get<OrdemCompra>(`${API_URL}ordens_compra/${id}`)
		return response.data
	},

	criar: async (data: Omit<OrdemCompra, "id">): Promise<OrdemCompra> => {
		const response = await axios.post<OrdemCompra>(`${API_URL}ordens_compra`, data)
		return response.data
	},

	atualizar: async (id: string, data: Partial<OrdemCompra>): Promise<OrdemCompra> => {
		const response = await axios.put<OrdemCompra>(`${API_URL}ordens_compra/${id}`, data)
		return response.data
	},

	excluir: async (id: string): Promise<void> => {
		await axios.delete(`${API_URL}ordens_compra/${id}`)
	},
}
