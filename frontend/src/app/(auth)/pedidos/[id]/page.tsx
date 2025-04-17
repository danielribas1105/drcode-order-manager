"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Pedido } from "@core"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import { pedidoService } from "@/services/pedidosService"
import { IconPencil, IconX } from "@tabler/icons-react"

export default function DetalhePedidoPage() {
	const params = useParams()
	const router = useRouter()
	const [pedido, setPedido] = useState<Pedido | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	const searchParams = useSearchParams()
	// Recupera as informações adicionais dos parâmetros de URL
	const nomeProduto = searchParams.get("nomeProduto") || "Produto não especificado"
	const nomeSupermercado = searchParams.get("nomeSupermercado") || "Supermercado não especificado"
	const nomeUsuario = searchParams.get("nomeUsuario") || "Usuário não especificado"

	const id = Array.isArray(params.id) ? params.id[0] : params.id

	useEffect(() => {
		async function carregarPedido(id: string) {
			try {
				const data = await pedidoService.obterPorId(id)
				setPedido(data)
			} catch (error) {
				console.error("Erro ao carregar usuário:", error)
				setError("Não foi possível carregar os detalhes do usuário.")
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			carregarPedido(id)
		}
	}, [id])

	const handleExcluir = async () => {
		if (!pedido) return

		if (confirm("Tem certeza que deseja excluir este pedido?")) {
			try {
				await pedidoService.excluir(pedido.id)
				router.push("/pedidos")
			} catch (error) {
				console.error("Erro ao excluir pedido:", error)
				setError("Não foi possível excluir o pedido.")
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
	if (!pedido)
		return (
			<Container>
				<div>Usuário não encontrado</div>
			</Container>
		)

	return (
		<Container className="flex-col">
			<HeaderPage titulo="Detalhes do Pedido" textoBtn="Voltar para Lista" linkBtn="/pedidos">
				<Link
					href={`/pedidos/edit/${pedido.id}`}
					className="flex gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
				>
					<IconPencil/>
					Editar
				</Link>
				<button
					onClick={handleExcluir}
					className="flex gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
				>
					<IconX/>
					Excluir
				</button>
			</HeaderPage>

			<div className="bg-white shadow rounded-lg p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h3 className="text-gray-500 font-medium">Pedido/Ordem Compra</h3>
						<p className="text-lg">{nomeProduto}</p>
					</div>

					<div>
						<h3 className="text-gray-500 font-medium">Data</h3>
						<p className="text-lg">{pedido.data}</p>
					</div>

					<div>
						<h3 className="text-gray-500 font-medium">Quant. Caixas</h3>
						<p className="text-lg">{pedido.qtdeCaixas}</p>
					</div>

					<div>
						<h3 className="text-gray-500 font-medium">Supermercado</h3>
						<p className="text-lg">{nomeSupermercado}</p>
					</div>

					<div className="md:col-span-2">
						<h3 className="text-gray-500 font-medium">Comprador</h3>
						<p className="text-lg">{nomeUsuario}</p>
					</div>
				</div>
			</div>
		</Container>
	)
}
