"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { OrdemCompra } from "@core"
import { ordemCompraService } from "@/services/ordensCompraService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import OrdemCompraForm from "@/components/ordensCompra/form-ordem-compra"

export default function EditarOrdemCompraPage() {
	const params = useParams()
	const [ordemCompra, setOrdemCompra] = useState<OrdemCompra | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	const id = Array.isArray(params.id) ? params.id[0] : params.id

	useEffect(() => {
		async function carregarOrdemCompra(id: string) {
			try {
				const data = await ordemCompraService.obterPorId(id)
				setOrdemCompra(data)
			} catch (error) {
				console.error("Erro ao carregar usuário:", error)
				setError("Não foi possível carregar os dados do usuário.")
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			carregarOrdemCompra(id)
		}
	}, [id])

	if (loading) return <Container>Carregando...</Container>
	if (error)
		return (
			<Container>
				<div className="text-red-600">{error}</div>
			</Container>
		)
	if (!ordemCompra)
		return (
			<Container>
				<div>Ordem de compra não encontrada</div>
			</Container>
		)

	return (
		<Container className="flex-col">
			<HeaderPage titulo={"Editar OC"} textoBtn="Voltar para Lista" linkBtn="/ordensCompra" />
			<OrdemCompraForm ordemCompra={ordemCompra} isEditing={true} />
		</Container>
	)
}
