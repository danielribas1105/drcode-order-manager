import { OrdemCompra } from "@core"
import BtnsGroup from "../templates/btns-group"

export interface ListaOrdensCompraProps {
	ordensCompra: OrdemCompra[]
	onExcluir?: (id: string) => void
}

export default function ListaPedidos({ ordensCompra, onExcluir }: ListaOrdensCompraProps) {
	return (
		<ul className="flex flex-col gap-2">
			{ordensCompra.length > 0 ? (
				ordensCompra.map((oc) => (
						<li key={oc.id} className="flex flex-col md:flex-row md:justify-between p-2 border-2 border-zinc-200 rounded-lg hover:bg-gray-50">
							<div>
								<span className="font-bold text-lg py-3 px-4">{oc.produtoId}</span>
								<div className="text-base text-zinc-400">
									<span className="py-3 px-4">{oc.data}</span>
									<span className="py-3 px-4">{oc.preco}</span>
									<span className="py-3 px-4">{oc.prazo}</span>
									<span className="py-3 px-4">{oc.data}</span>
									<span className="py-3 px-4">{oc.qtdeCaixasPallet}</span>
									<span className="py-3 px-4">{oc.qtdePallets}</span>
									<span className="py-3 px-4">{oc.entrega}</span>
								</div>
							</div>
							<BtnsGroup href="ordens_compra" objetoId={oc.id} onExcluir={onExcluir}/>
						</li>
					))
				) : (
					<span className="py-4 px-4 text-center text-gray-500">
						Nenhuma ordem de compra encontrada
					</span>
				)}
		</ul>
	)
}
