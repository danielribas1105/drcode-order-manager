import { Usuario } from "@core"
import { httpGet } from "./api"

export async function obterUsuarios() {
	const usuarios: Usuario[] = await httpGet("/usuarios")

	return {
		todos: usuarios,
		get destaques() {
			return usuarios.filter((usuario) => usuario.nome)
		},
	}
}
