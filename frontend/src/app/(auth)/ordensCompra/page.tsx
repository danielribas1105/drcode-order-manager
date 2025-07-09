import Container from "@/components/layout/container"
import ListaOrdensCompra from "@/components/ordensCompra/lista-ordens-compra"
import HeaderPage from "@/components/templates/header-page"
import { ordemCompraService } from "@/services/ordensCompraService"
import { pedidoService } from "@/services/pedidosService"
import { produtoService } from "@/services/produtosService"

export default async function OrdensCompraPage() {
	const ordensCompra = await ordemCompraService.obterTodas()
	const produtos = await produtoService.obterTodos()
	const pedidos = await pedidoService.obterTodos()

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="OCs Cadastradas"
				textofiltro={"Pesquisar Ordem Compra"}
				textoBtn="Adicionar OC"
				linkBtn="/ordensCompra/add"
			/>
			<ListaOrdensCompra ordensCompra={ordensCompra} produtos={produtos} pedidos={pedidos} />
		</Container>
	)
}
