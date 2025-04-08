"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Usuario } from "@core"
import { usuarioService } from "@/services/usuariosService"
import { GerarIds } from "@/utils"

export interface UsuarioFormProps {
	usuario?: Usuario
	isEditing?: boolean
}

export default function UsuarioForm({ usuario, isEditing = false }: UsuarioFormProps) {
	const router = useRouter()
	const [formState, setFormState] = useState({
		id: GerarIds.newId(),
		nome: "",
		email: "",
		cpf: "",
		perfil: "",
		status: "",
		imagemUrl: "",
		senha:""
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		if (usuario) {
			setFormState({
				id: usuario.id,
				nome: usuario.nome,
				email: usuario.email || "",
				cpf: usuario.cpf || "",
				perfil: usuario.perfil || "",
				status: usuario.status || "",
				imagemUrl: usuario.imagemUrl || "",
				senha: usuario.senha
			})
		}
	}, [usuario])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormState((prev) => ({
			...prev,
			[name]: name === "preco" || name === "estoque" ? Number(value) : value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setError("")

		try {
			if (isEditing && usuario) {
				await usuarioService.atualizar(usuario.id, formState)
			} else {
				await usuarioService.criar(formState)
			}
			router.push("/usuarios")
			router.refresh()
		} catch (error) {
			console.error("Erro ao salvar usuário:", error)
			setError("Ocorreu um erro ao salvar o usuário. Tente novamente.")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			<div className="mb-4">
				<label htmlFor="nome" className="block text-gray-700 font-medium mb-2">
					Nome *
				</label>
				<input
					type="text"
					id="nome"
					name="nome"
					value={formState.nome}
					onChange={handleChange}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="email" className="block text-gray-700 font-medium mb-2">
					E-mail
				</label>
				<input
					type="text"
					id="email"
					name="email"
					value={formState.email}
					onChange={handleChange}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label htmlFor="cpf" className="block text-gray-700 font-medium mb-2">
						CPF
					</label>
					<input
						type="text"
						id="cpf"
						name="cpf"
						value={formState.cpf}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>

			<div className="mb-6">
				<label htmlFor="perfil" className="block text-gray-700 font-medium mb-2">
					Perfil
				</label>
				<select className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
					id="perfil" name="perfil"
					defaultValue={formState.perfil ?? ""}
					onChange={(e) => handleChange}>
					<option value="" disabled hidden>Selecione uma opção</option>
					<option value="Admin">Admin</option>
					<option value="Comprador">Comprador</option>
					<option value="Operacional">Operacional</option>
                </select>
				{/* <input
					type="text"
					id="perfil"
					name="perfil"
					value={formState.perfil}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/> */}
			</div>

			<div className="mb-6">
				<label htmlFor="status" className="block text-gray-700 font-medium mb-2">
					Status
				</label>
				<select className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
					defaultValue={formState.status ?? ""}
					onChange={(e) => handleChange}>
					<option value="" disabled hidden>Selecione uma opção</option>
					<option value="Ativo">Ativo</option>
					<option value="Bloqueado">Bloqueado</option>
					<option value="Cancelado">Cancelado</option>
				</select>
				{/* <input
					type="text"
					id="status"
					name="status"
					value={formState.status}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/> */}
			</div>

			<div className="flex justify-end gap-4">
				<button
					type="button"
					onClick={() => router.back()}
					className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
				>
					Cancelar
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
				>
					{isSubmitting ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
				</button>
			</div>
		</form>
	)
}
