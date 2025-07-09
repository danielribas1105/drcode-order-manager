"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Supermercado, Usuario } from "@core"
import { supermercadoService } from "@/services/supermercadosService"
import { usuarioService } from "@/services/usuariosService"
import { GerarIds } from "@/utils"
import { IconCancel, IconCheck } from "@tabler/icons-react"

export interface SupermercadoFormProps {
	supermercado?: Partial<Supermercado>
	isEditing?: boolean
}

export default function SupermercadoForm({ supermercado, isEditing = false }: SupermercadoFormProps) {
	const [usuarios, setUsuarios] = useState<Usuario[]>([])
	const router = useRouter()
	const [formState, setFormState] = useState({
		id: GerarIds.newId(),
		razaoSocial: "",
		cnpj: "",
		usuarioId: "",
		status: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		async function carregarUsuarios() {
			try {
				const data = await usuarioService.obterTodos()
				setUsuarios(data)
			} catch (error) {
				console.error("Erro ao carregar usuários:", error)
			}
		}
		carregarUsuarios()

		if (supermercado) {
			setFormState({
				id: supermercado.id || "",
				razaoSocial: supermercado.razaoSocial || "",
				cnpj: supermercado.cnpj || "",
				usuarioId: supermercado.usuarioId || "",
				status: supermercado.status || "",
			})
		}
	}, [supermercado])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
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
			if (isEditing && supermercado?.id) {
				await supermercadoService.atualizar(supermercado.id, formState)
			} else {
				await supermercadoService.criar(formState)
			}
			router.push("/supermercados")
			router.refresh()
		} catch (error) {
			console.error("Erro ao salvar supermercado:", error)
			setError("Ocorreu um erro ao salvar o supermercado. Tente novamente.")
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
				<label htmlFor="razaoSocial" className="block text-gray-700 font-medium mb-2">
					Razão Social *
				</label>
				<input
					type="text"
					id="razaoSocial"
					name="razaoSocial"
					value={formState.razaoSocial}
					onChange={handleChange}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="cnpj" className="block text-gray-700 font-medium mb-2">
					CNPJ
				</label>
				<input
					type="text"
					id="cnpj"
					name="cnpj"
					value={formState.cnpj}
					onChange={handleChange}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label htmlFor="usuarioId" className="block text-gray-700 font-medium mb-2">
						Comprador
					</label>
					<select
						id="usuarioId"
						name="usuarioId"
						value={formState.usuarioId}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="" disabled>
							Selecione um comprador
						</option>
						{usuarios.map((usuario) => (
							<option key={usuario.id} value={usuario.id}>
								{usuario.nome}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="mb-6">
				<label htmlFor="status" className="block text-gray-700 font-medium mb-2">
					Status
				</label>
				<select
					className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
					id="status"
					name="status"
					defaultValue={formState.status}
					onChange={handleChange}
				>
					<option value="" disabled hidden>
						Selecione uma opção
					</option>
					<option value="Ativo">Ativo</option>
					<option value="Bloqueado">Bloqueado</option>
					<option value="Cancelado">Cancelado</option>
				</select>
			</div>

			<div className="flex justify-end gap-4">
				<button
					type="button"
					onClick={() => router.back()}
					className="flex gap-2 itens-center px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white border-2 border-red-600 rounded-md"
				>
					<IconCancel />
					Cancelar
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className="flex gap-2 itens-center px-4 py-2 text-green-600 hover:bg-green-600 hover:text-white border-2 border-green-600 rounded-md disabled:bg-green-400"
				>
					<IconCheck />
					{isSubmitting ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
				</button>
			</div>
		</form>
	)
}
