"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Usuario } from "@core"
import { usuarioService } from "@/services/usuariosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import semImagem from "@/../public/images/img-user.png"
import { IconPencil, IconX } from "@tabler/icons-react"

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

			<div className="flex items-center gap-10 bg-white shadow rounded-lg p-6">
				<div className="w-[240px] h-[240px] relative">
					<Image
						src={!usuario.imagemUrl ? semImagem : usuario.imagemUrl}
						fill
						className="object-contain"
						alt={`Foto do produto ${usuario.nome}`}
					/>
				</div>
				<div className="flex flex-col gap-6">
					<div>
						<h3 className="text-gray-500 font-medium">Nome</h3>
						<p className="text-lg">{usuario.nome}</p>
					</div>

					<div className="flex gap-10">
						<div>
							<h3 className="text-gray-500 font-medium">E-mail</h3>
							<p className="text-lg">{usuario.email}</p>
						</div>
						<div>
							<h3 className="text-gray-500 font-medium">CPF</h3>
							<p className="text-lg">{usuario.cpf}</p>
						</div>
					</div>

					<div className="flex gap-10">
						<div>
							<h3 className="text-gray-500 font-medium">Perfil</h3>
							<p className="text-lg">{usuario.perfil}</p>
						</div>
						<div>
							<h3 className="text-gray-500 font-medium">Status</h3>
							<p className="text-lg">{usuario.status}</p>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}
