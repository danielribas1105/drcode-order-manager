import { Produto, Supermercado } from "@core"
import { IconCancel, IconEye, IconPencil } from "@tabler/icons-react"
import Link from "next/link"
import BtnsGroup from "../templates/btns-group"

export interface ListaSupermercadosProps {
    supermercados: Supermercado[]
    onExcluir?: (id: string) => void
}

export default function ListaSupermercados({ supermercados, onExcluir }: ListaSupermercadosProps) {
    return (
        <ul className="flex flex-col gap-2">
            {supermercados.length > 0 ? (
                        supermercados.map((supermercado) => (
                            <li key={supermercado.id} className="flex flex-col md:flex-row items-center md:justify-between py-3 px-4 border-2 border-zinc-200 rounded-lg hover:bg-gray-50">
                                <div>
                                    <span className="font-bold text-lg py-3 px-4">{supermercado.razaoSocial}</span>
                                    <div className="text-base text-zinc-400">
                                        <span className="py-3 px-4">{supermercado.cnpj}</span>
                                        <span className="py-3 px-4">{supermercado.status}</span>
                                    </div>
                                </div>
                                <BtnsGroup href="supermercados" objeto={supermercado.id} onExcluir={onExcluir}/>
                            </li>
                        ))
                    ) : (
                        <span className="py-4 px-4 text-center text-gray-500">
                            Nenhum supermercado encontrado
                        </span>
                    )}
        </ul>

    )
}