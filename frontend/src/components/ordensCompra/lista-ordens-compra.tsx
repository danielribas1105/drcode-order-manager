import { OrdemCompra } from "@core"
import CardOrdemCompra from "./card-ordem-compra"

export interface ListaOrdensCompraProps {
	ordensCompra: OrdemCompra[]
}

export default function ListaOrdensCompra(props: ListaOrdensCompraProps) {
	// Garantir que é um array antes de usar .map()
	const ordensCompraArray = Array.isArray(props.ordensCompra) ? props.ordensCompra : []

	return ordensCompraArray ? (
		<div className="flex flex-wrap justify-center gap-4">
			{ordensCompraArray.map((ordemCompra: OrdemCompra) => (
				<CardOrdemCompra key={ordemCompra.id} ordemCompra={ordemCompra} />
			))}
		</div>
	) : null
}
