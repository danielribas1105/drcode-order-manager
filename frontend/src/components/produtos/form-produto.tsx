"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Produto } from "@core"
import { produtoService } from "@/services/produtosService"
import { GerarIds } from "@/utils"

export interface ProdutoFormProps {
	produto?: Produto
	isEditing?: boolean
}

export default function ProdutoForm({ produto, isEditing = false }: ProdutoFormProps) {
	const router = useRouter()
	const [formState, setFormState] = useState({
		id: GerarIds.newId(),
		nome: "",
		marca: "",
		peso: "",
		imagemUrl: "",
		especificacoes: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		if (produto) {
			setFormState({
				id: produto.id,
				nome: produto.nome,
				marca: produto.marca || "",
				peso: produto.peso || "",
				imagemUrl: produto.imagemUrl || "",
				especificacoes: produto.especificacoes || "",
			})
		}
	}, [produto])

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
			if (isEditing && produto) {
				await produtoService.atualizar(produto.id, formState)
			} else {
				await produtoService.criar(formState)
			}
			router.push("/produtos")
			router.refresh()
		} catch (error) {
			console.error("Erro ao salvar produto:", error)
			setError("Ocorreu um erro ao salvar o produto. Tente novamente.")
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
				<label htmlFor="marca" className="block text-gray-700 font-medium mb-2">
					Marca
				</label>
				<input
					type="text"
					id="marca"
					name="marca"
					value={formState.marca}
					onChange={handleChange}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label htmlFor="peso" className="block text-gray-700 font-medium mb-2">
						Peso
					</label>
					<input
						type="text"
						id="peso"
						name="peso"
						value={formState.peso}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>

			<div className="mb-6">
				<label htmlFor="especificacoes" className="block text-gray-700 font-medium mb-2">
					Especificações
				</label>
				<input
					type="text"
					id="especificacoes"
					name="especificacoes"
					value={formState.especificacoes}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
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
