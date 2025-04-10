"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Usuario } from "@core"
import { usuarioService } from "@/services/usuariosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"

export default function DetalheUsuarioPage() {
	const params = useParams()
	const router = useRouter()
	const [usuario, setUsuario] = useState<Usuario | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	const id = Array.isArray(params.id) ? params.id[0] : params.id

	useEffect(() => {
		async function carregarUsuario(id: string) {
			try {
				const data = await usuarioService.obterPorId(id)
				setUsuario(data)
			} catch (error) {
				console.error("Erro ao carregar usuário:", error)
				setError("Não foi possível carregar os detalhes do usuário.")
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			carregarUsuario(id)
		}
	}, [id])

	const handleExcluir = async () => {
		if (!usuario) return

		if (confirm("Tem certeza que deseja excluir este usuário?")) {
			try {
				await usuarioService.excluir(usuario.id)
				router.push("/usuarios")
			} catch (error) {
				console.error("Erro ao excluir usuário:", error)
				setError("Não foi possível excluir o usuário.")
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
	if (!usuario)
		return (
			<Container>
				<div>Usuário não encontrado</div>
			</Container>
		)

	return (
		<Container className="flex-col">
			<HeaderPage titulo="Detalhes do Usuário" textoBtn="Voltar para Lista" linkBtn="/usuarios">
				<Link
					href={`/usuarios/edit/${usuario.id}`}
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
						<h3 className="text-gray-500 font-medium">Nome</h3>
						<p className="text-lg">{usuario.nome}</p>
					</div>

					<div>
						<h3 className="text-gray-500 font-medium">E-mail</h3>
						<p className="text-lg">{usuario.email}</p>
					</div>

					<div>
						<h3 className="text-gray-500 font-medium">CPF</h3>
						<p className="text-lg font-medium text-green-600">{usuario.cpf}</p>
					</div>

					<div className="md:col-span-2">
						<h3 className="text-gray-500 font-medium">Status</h3>
						<p className="text-lg">{usuario.status}</p>
					</div>
				</div>
			</div>
		</Container>
	)
}
