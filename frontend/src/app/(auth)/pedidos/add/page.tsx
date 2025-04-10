"use client"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import UsuarioForm from "@/components/usuarios/form-usuario"

export default function NovoPedidoPage() {
	return (
		<Container className="flex-col">
			<HeaderPage titulo="Cadastrar Novo Pedido" textoBtn="Voltar para Lista" linkBtn="/pedidos" />
			<UsuarioForm />
		</Container>
	)
}
