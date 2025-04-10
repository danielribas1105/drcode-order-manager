"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Pedido } from "@core"
import { pedidoService } from "@/services/pedidosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import PedidoForm from "@/components/pedidos/form-pedido"

export default function EditarPedidoPage() {
	const params = useParams()
	const [pedido, setPedido] = useState<Pedido | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	const id = Array.isArray(params.id) ? params.id[0] : params.id

	useEffect(() => {
		async function carregarPedido(id: string) {
			try {
				const data = await pedidoService.obterPorId(id)
				setPedido(data)
			} catch (error) {
				console.error("Erro ao carregar usuário:", error)
				setError("Não foi possível carregar os dados do usuário.")
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			carregarPedido(id)
		}
	}, [id])

	if (loading) return <Container>Carregando...</Container>
	if (error)
		return (
			<Container>
				<div className="text-red-600">{error}</div>
			</Container>
		)
	if (!pedido)
		return (
			<Container>
				<div>Usuário não encontrado</div>
			</Container>
		)

	return (
		<Container className="flex-col">
			<HeaderPage titulo={"Editar Pedido"} textoBtn="Voltar para Lista" linkBtn="/pedidos" />
			<PedidoForm pedido={pedido} isEditing={true} />
		</Container>
	)
}
