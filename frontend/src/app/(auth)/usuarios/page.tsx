import Container from "@/components/layout/container"
import ListaUsuarios from "@/components/usuarios/lista-usuarios"
import { obterUsuarios } from "@/functions/usuarios"

export default async function UsuariosPage() {
	const listaUsuarios = await obterUsuarios()

	return (
		<Container className="flex-col">
			<ListaUsuarios usuarios={listaUsuarios.todos} />
		</Container>
	)
}
