import { Supermercado } from "@core"
import CardSupermercado from "./card-supermercado"

export interface ListaSupermercadosProps {
	supermercados: Supermercado[]
}

export default function ListaSupermercados(props: ListaSupermercadosProps) {
	// Garantir que é um array antes de usar .map()
	const supermercadosArray = Array.isArray(props.supermercados) ? props.supermercados : []

	return (
		<div className="flex flex-wrap justify-center gap-4">
			{supermercadosArray.map((supermercado: Supermercado) => (
				<CardSupermercado key={supermercado.id} supermercado={supermercado} />
			))}
		</div>
	)
}
