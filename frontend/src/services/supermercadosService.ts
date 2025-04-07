import axios from "axios"
import { Supermercado } from "@core"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export const supermercadoService = {
	obterTodos: async (): Promise<Supermercado[]> => {
		console.log(`${API_URL}supermercados`)
		const response = await axios.get<Supermercado[]>(`${API_URL}supermercados`)
		return response.data
	},

	obterPorId: async (id: string): Promise<Supermercado> => {
		const response = await axios.get<Supermercado>(`${API_URL}supermercados/${id}`)
		return response.data
	},

	criar: async (data: Omit<Supermercado, "id">): Promise<Supermercado> => {
		const response = await axios.post<Supermercado>(`${API_URL}supermercados`, data)
		return response.data
	},

	atualizar: async (id: string, data: Partial<Supermercado>): Promise<Supermercado> => {
		const response = await axios.put<Supermercado>(`${API_URL}supermercados/${id}`, data)
		return response.data
	},

	excluir: async (id: string): Promise<void> => {
		await axios.delete(`${API_URL}supermercados/${id}`)
	},
}
