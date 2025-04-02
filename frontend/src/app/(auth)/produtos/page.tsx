import Container from "@/components/layout/container"
import ListaProdutos from "@/components/produtos/lista-produtos"
import HeaderPage from "@/components/templates/header-page"
import { obterProdutos } from "@/functions/produtos"

export default async function ProdutosPage() {
	const listProdutos = await obterProdutos()
	console.log(listProdutos)

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Produtos Cadastrados"
				textoBtn="Adicionar Produto"
				textofiltro={"Pesquisar produto"}
			/>
			<ListaProdutos produtos={listProdutos.todos} />
		</Container>
	)
}
