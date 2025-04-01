import { Usuario } from "@core"
import CardUsuario from "./card-usuario"

export interface ListaUsuariosProps {
	usuarios: Usuario[]
}

export default function ListaUsuarios(props: ListaUsuariosProps) {
	// Garantir que é um array antes de usar .map()
	const usuariosArray = Array.isArray(props.usuarios) ? props.usuarios : []

	return usuariosArray ? (
		<div className="flex flex-wrap justify-center gap-4">
			{usuariosArray.map((usuario: Usuario) => (
				<CardUsuario key={usuario.id} usuario={usuario} />
			))}
		</div>
	) : null
}
