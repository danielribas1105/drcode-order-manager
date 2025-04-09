"use client"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import SupermercadoForm from "@/components/supermercados/form-supermercado"

export default function NovoSupermercadoPage() {
	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Cadastrar Novo Supermercado"
				textoBtn="Voltar para Lista"
				linkBtn="/supermercados"
			/>
			<SupermercadoForm />
		</Container>
	)
}
