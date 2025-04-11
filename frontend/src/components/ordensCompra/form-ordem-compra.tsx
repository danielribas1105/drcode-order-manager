"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { OrdemCompra } from "@core"
import { GerarIds } from "@/utils"
import { ordemCompraService } from "@/services/ordensCompraService"

export interface OrdemCompraFormProps {
	ordemCompra?: OrdemCompra
	isEditing?: boolean
}

export default function OrdemCompraForm({ ordemCompra, isEditing = false }: OrdemCompraFormProps) {
	const router = useRouter()
	const [formState, setFormState] = useState({
		id: GerarIds.newId(),
		data: "",
		preco: 0,
		prazo: 0,
		qtdeCaixasPallet: 0,
		qtdePallets: 0,
		entrega: "",
		observacoes: "",
		status: "",
		produtoId: "",
		usuarioId: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		if (ordemCompra) {
			setFormState({
				id: ordemCompra.id,
				data: ordemCompra.data || "",
				preco: ordemCompra.preco || 0,
				prazo: ordemCompra.prazo || 0,
				qtdeCaixasPallet: ordemCompra.qtdeCaixasPallet || 0,
				qtdePallets: ordemCompra.qtdePallets || 0,
				entrega: ordemCompra.entrega || "",
				observacoes: ordemCompra.observacoes || "",
				status: ordemCompra.status || "",
				produtoId: ordemCompra.produtoId || "",
				usuarioId: ordemCompra.usuarioId || "",
			})
		}
	}, [ordemCompra])

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
			if (isEditing && ordemCompra) {
				await ordemCompraService.atualizar(ordemCompra.id, formState)
			} else {
				await ordemCompraService.criar(formState)
			}
			router.push("/ordens_compra")
			router.refresh()
		} catch (error) {
			console.error("Erro ao salvar OC:", error)
			setError("Ocorreu um erro ao salvar a OC. Tente novamente.")
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
				<label htmlFor="produtoId" className="block text-gray-700 font-medium mb-2">
					Ordem Compra *
				</label>
				<input
					type="text"
					id="produtoId"
					name="produtoId"
					value={formState.produtoId}
					onChange={handleChange}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
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

			<div className="mb-4">
				<label htmlFor="preco" className="block text-gray-700 font-medium mb-2">
					Preço
				</label>
				<input
					type="text"
					id="preco"
					name="preco"
					value={formState.preco}
					onChange={handleChange}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label htmlFor="prazo" className="block text-gray-700 font-medium mb-2">
						Prazo
					</label>
					<input
						type="text"
						id="prazo"
						name="prazo"
						value={formState.prazo}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label htmlFor="qtdeCaixasPallet" className="block text-gray-700 font-medium mb-2">
						Qtde Caixas Pallet
					</label>
					<input
						type="text"
						id="qtdeCaixasPallet"
						name="qtdeCaixasPallet"
						value={formState.qtdeCaixasPallet}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label htmlFor="qtdePallets" className="block text-gray-700 font-medium mb-2">
						Qtde de Pallet
					</label>
					<input
						type="text"
						id="qtdePallets"
						name="qtdePallets"
						value={formState.qtdePallets}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label htmlFor="entrega" className="block text-gray-700 font-medium mb-2">
						Entrega
					</label>
					<input
						type="text"
						id="entrega"
						name="entrega"
						value={formState.entrega}
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
