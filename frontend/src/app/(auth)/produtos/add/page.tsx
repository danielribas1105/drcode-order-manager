"use client"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import ProdutoForm from "@/components/produtos/form-produto"

export default function NovoProdutoPage() {
	return (
		<Container className="flex-col">
			<HeaderPage titulo="Cadastrar Novo Produto" textoBtn="Voltar para Lista" linkBtn="/produtos" />
			<ProdutoForm />
		</Container>
	)
}
