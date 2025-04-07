"use client"
import { useEffect, useState } from "react"
import { Usuario } from "@core"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import ListaUsuarios from "@/components/usuarios/lista-usuarios"
import { obterUsuarios } from "@/functions/usuarios"
import { usuarioService } from "@/services/usuariosService"

export default function UsuariosPage() {
	//const listaUsuarios = await obterUsuarios()

	const [usuarios, setUsuarios] = useState<Usuario[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function carregarUsuarios() {
			console.log("carregarUsuarios")
			try {
				const data = await usuarioService.obterTodos()
				setUsuarios(data)
			} catch (error) {
				console.error("Erro ao carregar usuários:", error)
			} finally {
				setLoading(false)
			}
		}

		carregarUsuarios()
	}, [])

	const handleExcluir = async (id: string) => {
		if (confirm("Tem certeza que deseja excluir este usuário?")) {
			try {
				await usuarioService.excluir(id)
				setUsuarios(usuarios.filter((usuario) => usuario.id !== id))
			} catch (error) {
				console.error("Erro ao excluir usuário:", error)
			}
		}
	}

	if (loading) return <div>Carregando...</div>

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Usuários Cadastrados"
				textoBtn="Adicionar Usuário"
				textofiltro={"Pesquisar usuário"}
			/>
			<ListaUsuarios usuarios={usuarios} />
		</Container>
	)
}
