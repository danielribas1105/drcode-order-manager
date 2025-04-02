import Container from "@/components/layout/container"
import ListaOrdensCompra from "@/components/ordensCompra/lista-ordens-compra"
import HeaderPage from "@/components/templates/header-page"
import { obterOrdensCompra } from "@/functions/ordensCompra"

export default async function OrdensCompraPage() {
	const listaOrdensCompra = await obterOrdensCompra()

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="OCs Cadastradas"
				textoBtn="Adicionar OC"
				textofiltro={"Pesquisar Ordem Compra"}
			/>
			<ListaOrdensCompra ordensCompra={listaOrdensCompra.allOrdensCompra} />
		</Container>
	)
}
