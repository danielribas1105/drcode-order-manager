"use client"
import { useEffect, useState } from "react"
import { OrdemCompra } from "@core"
import { ordemCompraService } from "@/services/ordensCompraService"
import Container from "@/components/layout/container"
import ListaOrdensCompra from "@/components/ordensCompra/lista-ordens-compra"
import HeaderPage from "@/components/templates/header-page"

export default function OrdensCompraPage() {
	const [ordensCompra, setOrdensCompra] = useState<OrdemCompra[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function carregarOrdensCompra() {
			console.log("carregarOrdensCompra")
			try {
				const data = await ordemCompraService.obterTodas()
				setOrdensCompra(data)
			} catch (error) {
				console.error("Erro ao carregar ordens de compra:", error)
			} finally {
				setLoading(false)
			}
		}

		carregarOrdensCompra()
	}, [])

	const handleExcluir = async (id: string) => {
		if (confirm("Tem certeza que deseja excluir esta ordem de compra?")) {
			try {
				await ordemCompraService.excluir(id)
				setOrdensCompra(ordensCompra.filter((ordem) => ordem.id !== id))
			} catch (error) {
				console.error("Erro ao excluir ordem de compra:", error)
			}
		}
	}

	if (loading) return <div>Carregando...</div>

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="OCs Cadastradas"
				textofiltro={"Pesquisar Ordem Compra"}
				textoBtn="Adicionar OC"
				linkBtn="/ordensCompra/add"
			/>
			<ListaOrdensCompra ordensCompra={ordensCompra} onExcluir={handleExcluir} />
		</Container>
	)
}
