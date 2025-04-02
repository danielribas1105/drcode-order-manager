import Image from "next/image"
import { Produto } from "@core"
import Container from "../layout/container"
import BtnsSaveCancel from "../templates/btns-save-cancel"
import semImagem from "@/../public/images/no-image.jpg"

export interface FormProdutoProps {
	produto: Partial<Produto>
	alteraProduto: (produto: Partial<Produto>) => void
	salvar: () => void
	cancelar: () => void
}

export default function FormProduto(props: FormProdutoProps) {
	const { produto, alteraProduto, salvar, cancelar } = props
	return (
		<Container className="flex-col">
			<div className="flex flex-col justify-between md:flex-row gap-4 items-center mb-4">
				<h2 className="title-page-default">INFORMAÇÕES DO PRODUTO</h2>
			</div>
			<div className="flex flex-1 gap-4 mb-6">
				<div className="w-60 h-60 relative bg-white border-2">
					<Image
						src={produto.imagemUrl ?? semImagem}
						fill
						className="object-contain"
						alt={`Foto de perfil ${produto.nome}`}
					/>
				</div>
				<div className="flex flex-1 flex-col font-texto">
					<div className="flex flex-1 gap-4">
						<div className="flex flex-1 flex-col">
							<span>Produto:</span>
							<input
								className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
								placeholder="Nome do produto"
								onChange={(e) => alteraProduto({ ...produto, nome: e.target.value })}
								value={produto.nome ?? ""}
							/>
						</div>
						<div className="flex flex-col">
							<span>Código do produto:</span>
							<input
								className="text-xl text-zinc-400 p-2 rounded-md border-2 outline-none read-only:bg-gray-100"
								readOnly
								value={produto.id ?? ""}
							/>
						</div>
					</div>
					<div className="flex flex-1 gap-4">
						<div className="flex flex-1 flex-col">
							<span>Marca:</span>
							<input
								className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
								placeholder="Informe a marca do produto"
								onChange={(e) => alteraProduto({ ...produto, marca: e.target.value })}
								value={produto.marca ?? ""}
							/>
						</div>
						<div className="flex flex-1 flex-col">
							<span>Peso:</span>
							<input
								className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
								placeholder="Informe o peso do produto"
								onChange={(e) => alteraProduto({ ...produto, peso: e.target.value })}
								value={produto.peso ?? ""}
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
