// src/app/produtos/[id]/page.tsx
"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Produto } from "@core"
import { produtoService } from "@/services/produtosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import Link from "next/link"

export default function DetalheProdutoPage() {
	const params = useParams()
	const router = useRouter()
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
				setError("Não foi possível carregar os detalhes do produto.")
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			carregarProduto(id)
		}
	}, [id])

	const handleExcluir = async () => {
		if (!produto) return

		if (confirm("Tem certeza que deseja excluir este produto?")) {
			try {
				await produtoService.excluir(produto.id)
				router.push("/produtos")
			} catch (error) {
				console.error("Erro ao excluir produto:", error)
				setError("Não foi possível excluir o produto.")
			}
		}
	}

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
			<HeaderPage titulo="Detalhes do Produto" textoBtn="Voltar para Lista" linkBtn="/produtos">
				<Link
					href={`/produtos/edit/${produto.id}`}
					className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
				>
					Editar
				</Link>
				<button
					onClick={handleExcluir}
					className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
				>
					Excluir
				</button>
			</HeaderPage>

			<div className="bg-white shadow rounded-lg p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h3 className="text-gray-500 font-medium">Nome</h3>
						<p className="text-lg">{produto.nome}</p>
					</div>

					<div>
						<h3 className="text-gray-500 font-medium">Categoria</h3>
						<p className="text-lg">{produto.marca || ""}</p>
					</div>

					<div>
						<h3 className="text-gray-500 font-medium">Preço</h3>
						<p className="text-lg font-medium text-green-600">{produto.peso || ""}</p>
					</div>

					{/* <div>
						<h3 className="text-gray-500 font-medium">Estoque</h3>
						<p className="text-lg">{produto.estoque} unidades</p>
					</div> */}

					<div className="md:col-span-2">
						<h3 className="text-gray-500 font-medium">Especificações</h3>
						<p className="text-lg">{produto.especificacoes || "Sem especificações"}</p>
					</div>

					{/* <div>
						<h3 className="text-gray-500 font-medium">Data de Criação</h3>
						<p className="text-lg">{new Date(produto.createdAt).toLocaleDateString("pt-BR")}</p>
					</div>

					<div>
						<h3 className="text-gray-500 font-medium">Última Atualização</h3>
						<p className="text-lg">{new Date(produto.updatedAt).toLocaleDateString("pt-BR")}</p>
					</div> */}
				</div>
			</div>
		</Container>
	)
}
