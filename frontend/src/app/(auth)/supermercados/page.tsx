"use client"
import Container from "@/components/layout/container"
import ListaSupermercados from "@/components/supermercados/lista-supermercados"
import HeaderPage from "@/components/templates/header-page"
import { pedidoService } from "@/services/pedidosService"
import { supermercadoService } from "@/services/supermercadosService"
import { Pedido, Supermercado } from "@core"
import { useEffect, useState } from "react"

export default function SupermercadosPage() {
	const [supermercados, setSupermercados] = useState<Supermercado[]>([])
	const [pedidos, setPedidos] = useState<Pedido[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function carregarDados() {
			try {
				const [supermercadosRes, pedidosRes] = await Promise.all([
					supermercadoService.obterTodos(),
					pedidoService.obterTodos(),
				])
				setSupermercados(supermercadosRes)
				setPedidos(pedidosRes)
			} catch (error) {
				console.error("Erro ao carregar dados:", error)
			} finally {
				setLoading(false)
			}
		}

		carregarDados()
	}, [])

	if (loading) return <div>Carregando...</div>

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Supermercados Cadastrados"
				textofiltro={"Pesquisar Supermercado"}
				textoBtn="Adicionar Supermercado"
				linkBtn="/supermercados/add"
			/>
			<ListaSupermercados
				supermercados={supermercados}
				pedidos={pedidos}
				setSupermercados={setSupermercados}
			/>
		</Container>
	)
}
