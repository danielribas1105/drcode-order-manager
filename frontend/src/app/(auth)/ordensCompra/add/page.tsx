"use client"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import OrdemCompraForm from "@/components/ordensCompra/form-ordem-compra"

export default function NovaOrdemCompraPage() {
	return (
		<Container className="flex-col">
			<HeaderPage titulo="Cadastrar Nova OC" textoBtn="Voltar para Lista" linkBtn="/ordensCompra" />
			<OrdemCompraForm />
		</Container>
	)
}
