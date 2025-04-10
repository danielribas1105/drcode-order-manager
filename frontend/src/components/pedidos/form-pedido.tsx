"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Pedido } from "@core"
import { GerarIds } from "@/utils"
import { pedidoService } from "@/services/pedidosService"

export interface PedidoFormProps {
	pedido?: Pedido
	isEditing?: boolean
}

export default function PedidoForm({ pedido, isEditing = false }: PedidoFormProps) {
	const router = useRouter()
	const [formState, setFormState] = useState({
		id: GerarIds.newId(),
		ordemCompraId: "",
		usuarioId: "",
		supermercadoId: "",
		data: "",
		qtdeCaixas: 0,
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		if (pedido) {
			setFormState({
				id: pedido.id,
				ordemCompraId: pedido.ordemCompraId || "",
				usuarioId: pedido.usuarioId || "",
				supermercadoId: pedido.supermercadoId || "",
				data: pedido.data || "",
				qtdeCaixas: pedido.qtdeCaixas || 0,
			})
		}
	}, [pedido])

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
			if (isEditing && pedido) {
				await pedidoService.atualizar(pedido.id, formState)
			} else {
				await pedidoService.criar(formState)
			}
			router.push("/pedidos")
			router.refresh()
		} catch (error) {
			console.error("Erro ao salvar pedido:", error)
			setError("Ocorreu um erro ao salvar o pedido. Tente novamente.")
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
				<label htmlFor="ordemCompraId" className="block text-gray-700 font-medium mb-2">
					Ordem Compra *
				</label>
				<input
					type="text"
					id="ordemCompraId"
					name="ordemCompraId"
					value={formState.ordemCompraId}
					onChange={handleChange}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="supermercadoId" className="block text-gray-700 font-medium mb-2">
					Supermercado
				</label>
				<input
					type="text"
					id="supermercadoId"
					name="supermercadoId"
					value={formState.supermercadoId}
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
					<input
						type="text"
						id="usuarioId"
						name="usuarioId"
						value={formState.usuarioId}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label htmlFor="data" className="block text-gray-700 font-medium mb-2">
						Data
					</label>
					<input
						type="text"
						id="data"
						name="data"
						value={formState.data}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
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
