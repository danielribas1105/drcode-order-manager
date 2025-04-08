// src/app/produtos/editar/[id]/page.tsx
"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Produto } from "@core"
import { produtoService } from "@/services/produtosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import ProdutoForm from "@/components/produtos/form-produto"

export default function EditarProdutoPage() {
	const params = useParams()
	const [produto, setProduto] = useState<Produto | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	const id = Array.isArray(params.id) ? params.id[0] : params.id

	useEffect(() => {
		async function carregarProduto(id: string) {
			try {
				const data = await produtoService.obterPorId(id)
				setProduto(data)
			} catch (error) {
				console.error("Erro ao carregar produto:", error)
				setError("Não foi possível carregar os dados do produto.")
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			carregarProduto(id)
		}
	}, [id])

	if (loading) return <Container>Carregando...</Container>
	if (error)
		return (
			<Container>
				<div className="text-red-600">{error}</div>
			</Container>
		)
	if (!produto)
		return (
			<Container>
				<div>Produto não encontrado</div>
			</Container>
		)

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo={`Editar Produto: ${produto.nome}`}
				textoBtn="Voltar para Lista"
				linkBtn="/produtos"
			/>
			<ProdutoForm produto={produto} isEditing={true} />
		</Container>
	)
}
