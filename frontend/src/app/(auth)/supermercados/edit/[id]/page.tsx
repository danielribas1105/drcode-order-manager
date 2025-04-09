"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Supermercado } from "@core"
import { supermercadoService } from "@/services/supermercadosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import SupermercadoForm from "@/components/supermercados/form-supermercado"

export default function EditarSupermercadoPage() {
	const params = useParams()
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
				setError("Não foi possível carregar os dados do supermercado.")
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			carregarSupermercado(id)
		}
	}, [id])

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
				titulo={`Editar Supermercado: ${supermercado.razaoSocial}`}
				textoBtn="Voltar para Lista"
				linkBtn="/supermercados"
			/>
			<SupermercadoForm supermercado={supermercado} isEditing={true} />
		</Container>
	)
}
