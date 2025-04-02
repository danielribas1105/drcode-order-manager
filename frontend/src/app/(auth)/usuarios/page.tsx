import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import ListaUsuarios from "@/components/usuarios/lista-usuarios"
import { obterUsuarios } from "@/functions/usuarios"

export default async function UsuariosPage() {
	const listaUsuarios = await obterUsuarios()

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Usuários Cadastrados"
				textoBtn="Adicionar Usuário"
				textofiltro={"Pesquisar usuário"}
			/>
			<ListaUsuarios usuarios={listaUsuarios.todos} />
		</Container>
	)
}
