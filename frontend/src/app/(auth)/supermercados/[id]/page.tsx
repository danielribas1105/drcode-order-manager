"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Supermercado } from "@core"
import { supermercadoService } from "@/services/supermercadosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"

export default function DetalheSupermercadoPage() {
	const params = useParams()
	const router = useRouter()
	const [supermercado, setSupermercado] = useState<Supermercado | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	const id = Array.isArray(params.id) ? params.id[0] : params.id

	useEffect(() => {
		async function carregarSupermercado(id: string) {
			try {
				const data = await supermercadoService.obterPorId(id)
				setSupermercado(data)
			} catch (error) {
				console.error("Erro ao carregar supermercado:", error)
				setError("Não foi possível carregar os detalhes do supermercado.")
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			carregarSupermercado(id)
		}
	}, [id])

	const handleExcluir = async () => {
		if (!supermercado) return

		if (confirm("Tem certeza que deseja excluir este supermercado?")) {
			try {
				await supermercadoService.excluir(supermercado.id)
				router.push("/supermercados")
			} catch (error) {
				console.error("Erro ao excluir supermercado:", error)
				setError("Não foi possível excluir o supermercado.")
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
	if (!supermercado)
		return (
			<Container>
				<div>Supermercado não encontrado</div>
			</Container>
		)

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Detalhes do Supermercado"
				textoBtn="Voltar para Lista"
				linkBtn="/supermercados"
			>
				<Link
					href={`/supermercados/edit/${supermercado.id}`}
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
						<h3 className="text-gray-500 font-medium">Razão Social</h3>
						<p className="text-lg">{supermercado.razaoSocial}</p>
					</div>

					<div>
						<h3 className="text-gray-500 font-medium">CNPJ</h3>
						<p className="text-lg">{supermercado.cnpj}</p>
					</div>

					<div>
						<h3 className="text-gray-500 font-medium">Comprador</h3>
						<p className="text-lg font-medium text-green-600">{supermercado.usuarioId}</p>
					</div>

					<div className="md:col-span-2">
						<h3 className="text-gray-500 font-medium">Status</h3>
						<p className="text-lg">{supermercado.status}</p>
					</div>
				</div>
			</div>
		</Container>
	)
}
