import { Produto } from "@core"
import { httpGet } from "./api"

export async function obterProdutos() {
	const produtos: Produto[] = await httpGet("/produtos")

	return {
		todos: produtos,
		get destaques() {
			return produtos.filter((produto) => produto.nome)
		},
	}
}
