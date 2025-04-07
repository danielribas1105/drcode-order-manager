// frontend/src/components/OrdemCompraForm.tsx
import { useState } from "react"
import { ordemCompraService } from "@/services/ordensCompraService"
import { useRouter } from "next/router"

export default function OrdemCompraForm() {
	const router = useRouter()
	const [formData, setFormData] = useState({
		// Defina os campos conforme sua entidade OrdemCompra
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

	const handleChange = (e: any) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		try {
			await ordemCompraService.criar(formData)
			router.push("/ordens_compra") // Redireciona para a lista após criar
		} catch (error) {
			console.error("Erro ao criar ordem de compra:", error)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Produto Id:</label>
				<input type="text" name="id" value={formData.produtoId} onChange={handleChange} />
			</div>
			<div>
				<label>Data de Emissão:</label>
				<input type="date" name="data" value={formData.data} onChange={handleChange} />
			</div>
			<div>
				<label>Preço:</label>
				<input type="number" name="preco" value={formData.preco} onChange={handleChange} />
			</div>
			{/* Adicione outros campos conforme necessário */}
			<button type="submit">Salvar</button>
		</form>
	)
}
