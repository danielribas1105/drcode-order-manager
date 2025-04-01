import Container from "@/components/layout/container"
import ListaOrdensCompra from "@/components/ordensCompra/lista-ordens-compra"
import { obterOrdensCompra } from "@/functions/ordensCompra"

export default async function OrdensCompraPage() {
	const listaOrdensCompra = await obterOrdensCompra()

	return (
		<Container className="flex-col">
			<ListaOrdensCompra ordensCompra={listaOrdensCompra.allOrdensCompra} />
		</Container>
	)
}
