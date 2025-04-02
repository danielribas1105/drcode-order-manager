"use client"
import { OrdemCompra } from "@core"
import { IconChecklist, IconEdit, IconEyeCheck, IconTrash } from "@tabler/icons-react"

export interface CardOrdemCompraProps {
	ordemCompra: OrdemCompra
}

export default function CardOrdemCompra(props: CardOrdemCompraProps) {
	const { ordemCompra } = props

	return (
		<div className="flex flex-col w-auto h-auto bg-zinc-100 border-2 rounded-3xl p-2 text-zinc-800 hover:shadow-xl hover:shadow-logo-black/30">
			<div className="flex flex-col gap-2 justify-start pb-2 border-b-2">
				<div className="font-semibold text-lg text-center text-blue-800">{ordemCompra.id}</div>
				<div className="flex justify-between items-center">
					<div className="flex gap-2 text-sm italic text-zinc-400">
						<span className="font-semibold">Nº:</span>
						<span>{ordemCompra.id}</span>
					</div>
					<div className="flex gap-2">
						<span>{ordemCompra.status === "Ativa" ? "Ativa" : "Outro"}</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col pt-2 pb-2 border-b-2">
				<div className="flex justify-between gap-1">
					<div className="flex gap-2">
						<span>Preço:</span>
						<span>R$ {ordemCompra.preco}</span>
					</div>
					<div className="flex gap-2">
						<span>Data:</span>
						<span>{ordemCompra.data}</span>
					</div>
				</div>
				<div className="flex gap-2">
					<span>Caixas por pallet:</span>
					<span>{ordemCompra.qtdeCaixasPallet}</span>
				</div>
				<div className="flex gap-2">
					<span>Prazo:</span>
					<span>{ordemCompra.prazo} dias</span>
				</div>
			</div>
			<div className="flex flex-col pt-2 pb-2">
				<div className="flex gap-2">
					<span>Quantidade de pedidos:</span>
					<span>calcular???</span>
				</div>
				<div className="flex gap-2">
					<span>Total de caixas:</span>
					<span>calcular???</span>
				</div>
			</div>
			<div className="flex justify-center mb-1">
				<div className="flex flex-col md:flex-row gap-2 items-center">
					<div className="flex gap-2 items-center">
						<button
							className="flex justify-center items-center gap-1 px-2 py-1 font-logo text-sm text-logo-white bg-emerald-400 hover:bg-emerald-600 border-2 rounded-md"
							onClick={(e) => {
								e.preventDefault()
								//props.selecionarOrdemCompra(ordemCompra)
							}}
						>
							<IconEyeCheck size={20} />
							<span>Visualizar</span>
						</button>
						<button
							className="flex justify-center items-center gap-1 px-2 py-1 font-logo text-sm text-logo-white bg-yellow-400 hover:bg-yellow-600 border-2 rounded-md"
							onClick={(e) => {
								e.preventDefault()
								alert("Deseja fechar a ordem de compra e gerar o pedido?")
							}}
						>
							<IconChecklist size={20} />
							<span>Fechar Pedido</span>
						</button>
					</div>
					<div className="flex gap-2 items-center">
						<button
							className="flex justify-center items-center gap-1 px-2 py-1 font-logo text-sm text-logo-white bg-blue-400 hover:bg-blue-600 border-2 rounded-md"
							onClick={(e) => {
								e.preventDefault()
								//props.selecionarOrdemCompra(ordemCompra)
							}}
						>
							<IconEdit size={20} />
							<span>Editar</span>
						</button>
						<button
							className="flex justify-center items-center gap-1 px-2 py-1 font-logo text-sm text-logo-white bg-red-400 hover:bg-red-600 border-2 rounded-md"
							onClick={(e) => {
								e.preventDefault()
								//props.removerOrdemCompra(ordemCompra)
							}}
						>
							<IconTrash size={20} />
							<span>Excluir</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
