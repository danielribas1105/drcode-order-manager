import { OrdemCompra } from "@core"
import { IconPlus } from "@tabler/icons-react"
import { GerarDatas } from "@/utils"
import Container from "@/components/layout/container"
import BtnsSaveCancel from "@/components/templates/btns-save-cancel"
import FiltroProduto from "@/components/produtos/filtro-produto"

export interface FormOrdemCompraProps {
	ordemCompra: Partial<OrdemCompra>
	titleForm: string
	alteraOrdemCompra: (ordemCompra: Partial<OrdemCompra>) => void
	salvar: () => void
	cancelar: () => void
}

export default function FormOrdemCompra(props: FormOrdemCompraProps) {
	const { ordemCompra, titleForm, alteraOrdemCompra, salvar, cancelar } = props

	return (
		<Container className="flex-col">
			<div className="flex flex-col justify-between md:flex-row gap-4 items-center mb-4">
				<h2 className="title-page-default">{titleForm}</h2>
				<FiltroProduto placeholder={"Buscar produto"} />
				<button
					className="flex justify-center items-center gap-1 px-2 py-1 font-logo text-lg text-logo-white bg-orange-400 hover:bg-orange-600 border-2 rounded-md"
					onClick={(e) => {
						e.preventDefault()
						console.log("Add produto")
						/* adicionarItem(props.produto) */
					}}
				>
					<IconPlus size={20} />
					<span>Adicionar Produto</span>
				</button>
			</div>
			<div className="flex flex-1 gap-4 mb-6">
				<div className="flex flex-1 flex-col font-texto">
					<div className="flex flex-1 gap-4">
						<div className="flex flex-1 flex-col">
							<span>Nome do produto:</span>
							<input
								className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
								placeholder="Nome do produto"
								onChange={(e) => alteraOrdemCompra({ ...ordemCompra, id: e.target.value })}
								value={ordemCompra.id ?? ""}
							/>
						</div>
						<div className="flex flex-col">
							<span>Código da OC:</span>
							<input
								className="text-xl text-zinc-400 p-2 rounded-md border-2 outline-none read-only:bg-gray-100"
								readOnly
								value={ordemCompra.id ?? ""}
							/>
						</div>
					</div>
					<div className="flex flex-1 gap-4">
						<div className="flex flex-1 flex-col">
							<span>Preço:</span>
							<input
								className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
								placeholder="0,00"
								onChange={(e) =>
									alteraOrdemCompra({ ...ordemCompra, preco: +e.target.value })
								}
								value={ordemCompra.preco ?? ""}
							/>
						</div>
						<div className="flex flex-1 flex-col">
							<span>Data:</span>
							<input
								className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
								placeholder="E-mail mais utilizado"
								onChange={(e) => alteraOrdemCompra({ ...ordemCompra, data: e.target.value })}
								value={ordemCompra.data ?? GerarDatas.dataHoraMinuto()}
							/>
						</div>
					</div>
					<div className="flex flex-1 gap-4">
						<div className="flex flex-1 flex-col">
							<span>Caixas por pallet:</span>
							<input
								className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
								placeholder="Quantidade de caixas por pallet"
								onChange={(e) =>
									alteraOrdemCompra({ ...ordemCompra, qtdeCaixasPallet: +e.target.value })
								}
								value={ordemCompra.qtdeCaixasPallet ?? ""}
							/>
						</div>
						<div className="flex flex-1 flex-col">
							<span>Quantidade de pallets:</span>
							<input
								className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
								placeholder="Total de pallets"
								onChange={(e) =>
									alteraOrdemCompra({ ...ordemCompra, qtdePallets: +e.target.value })
								}
								value={ordemCompra.qtdePallets ?? ""}
							/>
						</div>
					</div>
					<div className="flex flex-1 gap-4">
						<div className="flex flex-1 flex-col">
							<span>Prazo:</span>
							<input
								className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
								placeholder="Quantidade de dias"
								onChange={(e) =>
									alteraOrdemCompra({ ...ordemCompra, prazo: +e.target.value })
								}
								value={ordemCompra.prazo ?? ""}
							/>
						</div>
						<div className="flex flex-1 flex-col">
							<span>Entrega:</span>
							<input
								className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
								placeholder="Tipo de entrega"
								onChange={(e) =>
									alteraOrdemCompra({ ...ordemCompra, entrega: e.target.value })
								}
								value={ordemCompra.entrega ?? ""}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-1 justify-end">
				<BtnsSaveCancel salvar={salvar} cancelar={cancelar} />
			</div>
		</Container>
	)
}
