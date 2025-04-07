import axios from "axios"
import { Produto } from "@core"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export const produtoService = {
	obterTodos: async (): Promise<Produto[]> => {
		console.log(`${API_URL}produtos`)
		const response = await axios.get<Produto[]>(`${API_URL}produtos`)
		return response.data
	},

	obterPorId: async (id: string): Promise<Produto> => {
		const response = await axios.get<Produto>(`${API_URL}produtos/${id}`)
		return response.data
	},

	criar: async (data: Omit<Produto, "id">): Promise<Produto> => {
		const response = await axios.post<Produto>(`${API_URL}produtos`, data)
		return response.data
	},

	atualizar: async (id: string, data: Partial<Produto>): Promise<Produto> => {
		const response = await axios.put<Produto>(`${API_URL}produtos/${id}`, data)
		return response.data
	},

	excluir: async (id: string): Promise<void> => {
		await axios.delete(`${API_URL}produtos/${id}`)
	},
}
