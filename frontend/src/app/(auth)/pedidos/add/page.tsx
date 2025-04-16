import { ordemCompraService } from "@/services/ordensCompraService"
import { produtoService } from "@/services/produtosService"
import { supermercadoService } from "@/services/supermercadosService"
import { usuarioService } from "@/services/usuariosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import PedidoForm from "@/components/pedidos/form-pedido"

export default async function NovoPedidoPage() {
	const ordensCompra = await ordemCompraService.obterTodas()
	const produtos = await produtoService.obterTodos()
	const usuarios = await usuarioService.obterTodos()
	const supermercados = await supermercadoService.obterTodos()

	return (
		<Container className="flex-col">
			<HeaderPage titulo="Cadastrar Novo Pedido" textoBtn="Voltar para Lista" linkBtn="/pedidos" />
			<PedidoForm 
				ordensCompra={ordensCompra}
				produtos={produtos}
				usuarios={usuarios}
				supermercados={supermercados}
			/>
		</Container>
	)
}
