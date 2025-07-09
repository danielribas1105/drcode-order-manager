import { supermercadoService } from "@/services/supermercadosService"
import { Pedido, Supermercado } from "@core"
import BtnsGroup from "../templates/btns-group"

interface ListaSupermercadosProps {
	supermercados: Supermercado[]
	pedidos: Pedido[]
	setSupermercados: (supermercados: Supermercado[]) => void
}

export default function ListaSupermercados({
	supermercados,
	pedidos,
	setSupermercados,
}: ListaSupermercadosProps) {
	function hasPedido(id: string): boolean {
		return pedidos.some((pedido) => pedido.supermercadoId === id)
	}

	const handleExcluir = async (id: string) => {
		if (hasPedido(id)) {
			alert("O supermercado não pode ser excluído, pois, existem pedidos associados!")
			return
		}
		if (confirm("Tem certeza que deseja excluir este supermercado?")) {
			try {
				await supermercadoService.excluir(id)
				setSupermercados(supermercados.filter((supermercado) => supermercado.id !== id))
			} catch (error) {
				console.error("Erro ao excluir o supermercado:", error)
			}
		}
	}

	return (
		<ul className="flex flex-col gap-2">
			{supermercados.length > 0 ? (
				supermercados.map((supermercado) => (
					<li
						key={supermercado.id}
						className="flex flex-col md:flex-row items-center md:justify-between py-3 px-4 border-2 border-zinc-200 rounded-lg hover:bg-gray-50"
					>
						<div>
							<span className="font-bold text-lg py-3 px-4">{supermercado.razaoSocial}</span>
							<div className="text-base text-zinc-400">
								<span className="py-3 px-4">{supermercado.cnpj}</span>
								<span className="py-3 px-4">{supermercado.status}</span>
							</div>
						</div>
						<BtnsGroup href="supermercados" objeto={supermercado} onExcluir={handleExcluir} />
					</li>
				))
			) : (
				<span className="py-4 px-4 text-center text-gray-500">Nenhum supermercado encontrado</span>
			)}
		</ul>
	)
}
