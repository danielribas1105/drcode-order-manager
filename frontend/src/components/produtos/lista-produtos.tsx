import { Produto } from "@core"
import { IconCancel, IconEye, IconPencil } from "@tabler/icons-react"
import Link from "next/link"
import BtnsGroup from "../templates/btns-group"

export interface ListaProdutosProps {
    produtos: Produto[]
    onExcluir?: (id: string) => void
}

export default function ListaProdutos({ produtos, onExcluir }: ListaProdutosProps) {
    return (
        <ul className="flex flex-col gap-2">
            {produtos.length > 0 ? (
						produtos.map((produto) => (
							<li key={produto.id} className="flex flex-col md:flex-row md:justify-between p-2 border-2 border-zinc-200 rounded-lg hover:bg-gray-50">
                                <div>
                                    <span className="font-bold text-lg py-3 px-4">{produto.nome}</span>
                                    <div className="text-base text-zinc-400">
                                        <span className="py-3 px-4">{produto.marca}</span>
                                        <span className="py-3 px-4">{produto.peso}</span>
                                    </div>
                                </div>
								<BtnsGroup href="produtos" objetoId={produto.id} onExcluir={onExcluir}/>
								{/* <div className="py-3 px-4 flex items-center gap-3">
									<Link
										href={`/produtos/${produto.id}`}
										className="flex gap-2 text-blue-600 hover:text-blue-800 py-1 px-3 border-2 border-blue-600 rounded-md"
									>
										<IconEye/>
										Ver
									</Link>
									<Link
										href={`/produtos/edit/${produto.id}`}
										className="flex gap-2 text-green-600 hover:text-green-800 py-1 px-3 border-2 border-green-600 rounded-md"
									>
										<IconPencil/>
										Editar
									</Link>
									{onExcluir && (
										<button
											onClick={() => onExcluir(produto.id)}
											className="flex gap-2 text-red-600 hover:text-red-800 py-1 px-3 border-2 border-red-600 rounded-md"
										>
											<IconCancel/>
											Excluir
										</button>
									)}
								</div> */}
							</li>
						))
					) : (
                        <span className="py-4 px-4 text-center text-gray-500">
                            Nenhum produto encontrado
                        </span>
					)}
        </ul>

    )
}