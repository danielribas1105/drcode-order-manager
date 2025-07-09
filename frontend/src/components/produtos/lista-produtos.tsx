import semImagem from "@/../public/images/no-image.jpg"
import { produtoService } from "@/services/produtosService"
import { OrdemCompra, Produto } from "@core"
import Image from "next/image"
import BtnsGroup from "../templates/btns-group"

interface ListaProdutosProps {
	produtos: Produto[]
	ordensCompra: OrdemCompra[]
	setProdutos: (produtos: Produto[]) => void
}

export default function ListaProdutos({ produtos, ordensCompra, setProdutos }: ListaProdutosProps) {
	function hasOrdensCompra(id: string): boolean {
		return ordensCompra.some((oc) => oc.produtoId === id)
	}

	const handleExcluir = async (id: string) => {
		if (hasOrdensCompra(id)) {
			alert("O produto não pode ser excluído, pois, existem OCs associadas!")
			return
		}
		if (confirm("Tem certeza que deseja excluir este produto?")) {
			try {
				await produtoService.excluir(id)
				setProdutos(produtos.filter((produto) => produto.id !== id))
			} catch (error) {
				console.error("Erro ao excluir o produto:", error)
			}
		}
	}

	return (
		<ul className="flex flex-col gap-2">
			{produtos.length > 0 ? (
				produtos.map((produto) => (
					<li
						key={produto.id}
						className="flex flex-col md:flex-row md:justify-between py-3 px-4 border-2 border-zinc-200 rounded-lg hover:bg-gray-50"
					>
						<div className="flex gap-2 items-center">
							<div className="w-14 h-14 relative bg-white">
								<Image
									src={!produto.imagemUrl ? semImagem : produto.imagemUrl}
									fill
									className="object-contain"
									alt={`Foto do produto ${produto.nome}`}
								/>
							</div>
							<div>
								<span className="font-bold text-lg py-3 px-4">{produto.nome}</span>
								<div className="text-base text-zinc-400">
									<span className="py-3 px-4">{produto.marca}</span>
									<span className="py-3 px-4">{produto.peso}</span>
								</div>
							</div>
						</div>
						<BtnsGroup href="produtos" objeto={produto} onExcluir={handleExcluir} />
					</li>
				))
			) : (
				<span className="py-4 px-4 text-center text-gray-500">Nenhum produto encontrado</span>
			)}
		</ul>
	)
}
