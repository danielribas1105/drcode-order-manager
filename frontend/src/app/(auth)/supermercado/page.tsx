"use client"
import { useEffect, useState } from "react"
import { Supermercado } from "@core"
import { supermercadoService } from "@/services/supermercadosService"
import { obterSupermercados } from "@/functions/supermercados"
import Container from "@/components/layout/container"
import ListaSupermercados from "@/components/supermercado/lista-supermercado"
import HeaderPage from "@/components/templates/header-page"

export default function SupermercadosPage() {
	//const listaSupermercados = await obterSupermercados()

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
				titulo="Supermercados Cadastradas"
				textoBtn="Adicionar Supermercado"
				textofiltro={"Pesquisar Supermercado"}
			/>
			<ListaSupermercados supermercados={supermercados} />
		</Container>
	)
}
