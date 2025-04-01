import { Produto } from "@core"
import CardProduto from "./card-produto"

export interface ListaProdutosProps {
	produtos: Produto[]
}

export default function ListaProdutos(props: ListaProdutosProps) {
	console.log("Tipo " + typeof props.produtos)
	// Garantir que é um array antes de usar .map()
	const produtosArray = Array.isArray(props.produtos) ? props.produtos : []

	return produtosArray ? (
		<div className="flex flex-wrap justify-center gap-4">
			{produtosArray.map((produto: Produto) => (
				<CardProduto key={produto.id} produto={produto} />
			))}
		</div>
	) : null
}
