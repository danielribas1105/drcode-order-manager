import axios from "axios"
import { Usuario } from "@core"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export const usuarioService = {
	obterTodos: async (): Promise<Usuario[]> => {
		console.log(`${API_URL}usuarios`)
		const response = await axios.get<Usuario[]>(`${API_URL}usuarios`)
		return response.data
	},

	obterPorId: async (id: string): Promise<Usuario> => {
		const response = await axios.get<Usuario>(`${API_URL}usuarios/${id}`)
		return response.data
	},

	criar: async (data: Omit<Usuario, "id">): Promise<Usuario> => {
		const response = await axios.post<Usuario>(`${API_URL}usuarios`, data)
		return response.data
	},

	atualizar: async (id: string, data: Partial<Usuario>): Promise<Usuario> => {
		const response = await axios.put<Usuario>(`${API_URL}usuarios/${id}`, data)
		return response.data
	},

	excluir: async (id: string): Promise<void> => {
		await axios.delete(`${API_URL}usuarios/${id}`)
	},
}
