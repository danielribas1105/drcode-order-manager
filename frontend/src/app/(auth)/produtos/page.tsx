"use client"
import Container from "@/components/layout/container"
import ListaProdutos from "@/components/produtos/lista-produtos"
import HeaderPage from "@/components/templates/header-page"
import { ordemCompraService } from "@/services/ordensCompraService"
import { produtoService } from "@/services/produtosService"
import { OrdemCompra, Produto } from "@core"
import { useEffect, useState } from "react"

export default function ProdutosPage() {
	const [produtos, setProdutos] = useState<Produto[]>([])
	const [ordensCompra, setOrdensCompra] = useState<OrdemCompra[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function carregarDados() {
			try {
				const [produtosRes, ordensRes] = await Promise.all([
					produtoService.obterTodos(),
					ordemCompraService.obterTodas(),
				])
				setProdutos(produtosRes)
				setOrdensCompra(ordensRes)
			} catch (error) {
				console.error("Erro ao carregar dados:", error)
			} finally {
				setLoading(false)
			}
		}

		carregarDados()
	}, [])

	if (loading) return <div className="text-center p-4">Carregando...</div>

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Produtos Cadastrados"
				textofiltro="Pesquisar produto"
				textoBtn="Adicionar Produto"
				linkBtn="/produtos/add"
			/>
			<ListaProdutos produtos={produtos} ordensCompra={ordensCompra} setProdutos={setProdutos} />
		</Container>
	)
}
