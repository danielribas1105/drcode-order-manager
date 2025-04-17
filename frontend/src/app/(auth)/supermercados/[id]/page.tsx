"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Supermercado, Usuario } from "@core"
import { supermercadoService } from "@/services/supermercadosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import { IconPencil, IconX } from "@tabler/icons-react"
import { usuarioService } from "@/services/usuariosService"

export default function DetalheSupermercadoPage() {
	const params = useParams()
	const router = useRouter()
	const [supermercado, setSupermercado] = useState<Supermercado | null>(null)
	const [usuarios, setUsuarios] = useState<Usuario[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	const id = Array.isArray(params.id) ? params.id[0] : params.id

	useEffect(() => {
		async function carregarUsuarios() {
			try {
				const data = await usuarioService.obterTodos()
				setUsuarios(data)
			} catch (error) {
				console.error("Erro ao carregar usuarios em detalhe supermercado:", error)
			}
		}
		carregarUsuarios()

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

	function findUsuario(id: string): string {
		const usuario = usuarios.find((u) => u.id === id)
		return usuario ? usuario.nome : "Usuário não encontrado"
	}

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
					className="flex gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
				>
					<IconPencil />
					Editar
				</Link>
				<button
					onClick={handleExcluir}
					className="flex gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
				>
					<IconX />
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
						<p className="text-lg">{findUsuario(supermercado.usuarioId)}</p>
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
