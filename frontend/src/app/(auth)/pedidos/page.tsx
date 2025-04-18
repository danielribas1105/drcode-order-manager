import { pedidoService } from "@/services/pedidosService"
import { ordemCompraService } from "@/services/ordensCompraService"
import { produtoService } from "@/services/produtosService"
import { usuarioService } from "@/services/usuariosService"
import { supermercadoService } from "@/services/supermercadosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import ListaPedidos from "@/components/pedidos/lista-pedidos"

export default async function PedidosPage() {
	const pedidos = await pedidoService.obterTodos()
	const ordensCompra = await ordemCompraService.obterTodas()
	const produtos = await produtoService.obterTodos()
	const usuarios = await usuarioService.obterTodos()
	const supermercados = await supermercadoService.obterTodos()

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Pedidos Cadastrados"
				textofiltro={"Pesquisar Pedidos"}
				textoBtn="Adicionar Pedido"
				linkBtn="/pedidos/add"
			/>
			<ListaPedidos
				pedidos={pedidos}
				ordensCompra={ordensCompra}
				produtos={produtos}
				usuarios={usuarios}
				supermercados={supermercados}
			/>
		</Container>
	)
}
