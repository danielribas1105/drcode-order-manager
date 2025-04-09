"use client"
import { useEffect, useState } from "react"
import { Supermercado } from "@core"
import { supermercadoService } from "@/services/supermercadosService"
import Container from "@/components/layout/container"
import TabelaSupermercados from "@/components/supermercados/tabela-supermercados"
import HeaderPage from "@/components/templates/header-page"
import ListaSupermercados from "@/components/supermercados/lista-supermercados"

export default function SupermercadosPage() {
	const [supermercados, setSupermercados] = useState<Supermercado[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function carregarSupermercados() {
			console.log("carregarOrdensCompra")
			try {
				const data = await supermercadoService.obterTodos()
				setSupermercados(data)
			} catch (error) {
				console.error("Erro ao carregar supermercados:", error)
			} finally {
				setLoading(false)
			}
		}

		carregarSupermercados()
	}, [])

	const handleExcluir = async (id: string) => {
		if (confirm("Tem certeza que deseja excluir este supermercado?")) {
			try {
				await supermercadoService.excluir(id)
				setSupermercados(supermercados.filter((supermercado) => supermercado.id !== id))
			} catch (error) {
				console.error("Erro ao excluir supermercado:", error)
			}
		}
	}

	if (loading) return <div>Carregando...</div>

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Supermercados Cadastrados"
				textofiltro={"Pesquisar Supermercado"}
				textoBtn="Adicionar Supermercado"
				linkBtn="/supermercados/add"
			/>
			{/* <TabelaSupermercados supermercados={supermercados} onExcluir={handleExcluir} /> */}
			<ListaSupermercados supermercados={supermercados} onExcluir={handleExcluir}/>
		</Container>
	)
}
