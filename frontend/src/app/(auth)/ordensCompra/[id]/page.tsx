"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { OrdemCompra } from "@core"
import { ordemCompraService } from "@/services/ordensCompraService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"

export default function DetalhePedidoPage() {
	const params = useParams()
	const router = useRouter()
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
				console.error("Erro ao carregar ordem de compra:", error)
				setError("Não foi possível carregar os detalhes da ordem de compra.")
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			carregarOrdemCompra(id)
		}
	}, [id])

	const handleExcluir = async () => {
		if (!ordemCompra) return

		if (confirm("Tem certeza que deseja excluir esta ordem de compra?")) {
			try {
				await ordemCompraService.excluir(ordemCompra.id)
				router.push("/ordens_compra")
			} catch (error) {
				console.error("Erro ao excluir ordem de compra:", error)
				setError("Não foi possível excluir a ordem de compra.")
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
	if (!ordemCompra)
		return (
			<Container>
				<div>Ordem de compra não encontrada</div>
			</Container>
		)

	return (
		<Container className="flex-col">
			<HeaderPage titulo="Detalhes do Pedido" textoBtn="Voltar para Lista" linkBtn="/pedidos">
				<Link
					href={`/ordens_compra/edit/${ordemCompra.id}`}
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
						<h3 className="text-gray-500 font-medium">Ordem Compra</h3>
						<p className="text-lg">{ordemCompra.produtoId}</p>
					</div>

					<div>
						<h3 className="text-gray-500 font-medium">Quant Caixas</h3>
						<p className="text-lg">{ordemCompra.preco}</p>
					</div>

					<div>
						<h3 className="text-gray-500 font-medium">Supermercado</h3>
						<p className="text-lg font-medium text-green-600">{ordemCompra.prazo}</p>
					</div>

					<div className="md:col-span-2">
						<h3 className="text-gray-500 font-medium">Comprador</h3>
						<p className="text-lg">{ordemCompra.data}</p>
					</div>
				</div>
			</div>
		</Container>
	)
}
