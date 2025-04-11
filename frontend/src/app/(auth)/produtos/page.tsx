"use client"
import { useEffect, useState } from "react"
import { Produto } from "@core"
import { produtoService } from "@/services/produtosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import ListaProdutos from "@/components/produtos/lista-produtos"

export default function ProdutosPage() {
	const [produtos, setProdutos] = useState<Produto[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function carregarProdutos() {
			console.log("carregarProdutos")
			try {
				const data = await produtoService.obterTodos()
				setProdutos(data)
			} catch (error) {
				console.error("Erro ao carregar produtos:", error)
			} finally {
				setLoading(false)
			}
		}

		carregarProdutos()
	}, [])

	const handleExcluir = async (id: string) => {
		if (confirm("Tem certeza que deseja excluir este produto?")) {
			try {
				await produtoService.excluir(id)
				setProdutos(produtos.filter((produto) => produto.id !== id))
			} catch (error) {
				console.error("Erro ao excluir o produto:", error)
			}
		}
	}

	if (loading) return <div>Carregando...</div>

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Produtos Cadastrados"
				textofiltro={"Pesquisar produto"}
				textoBtn="Adicionar Produto"
				linkBtn="/produtos/add"
			/>
			<ListaProdutos produtos={produtos} onExcluir={handleExcluir} />
		</Container>
	)
}
