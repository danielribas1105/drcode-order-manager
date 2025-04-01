import Container from "@/components/layout/container"
import ListaProdutos from "@/components/produtos/lista-produtos"
import { obterProdutos } from "@/functions/produtos"

export default async function ProdutosPage() {
	const listProdutos = await obterProdutos()
	console.log(listProdutos)

	return (
		<Container className="flex-col">
			<ListaProdutos produtos={listProdutos.todos} />
		</Container>
	)
}
