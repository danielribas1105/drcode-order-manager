import { IconCancel, IconEye, IconPencil } from "@tabler/icons-react";
import Link from "next/link";

export interface BtnsGroupProps {
    href: string
    objetoId: string
    onExcluir?: (id: string) => void
}

export default function BtnsGroup({href, objetoId, onExcluir}: BtnsGroupProps) {
    return (
        <div className="py-3 px-4 flex items-center gap-3">
            <Link
                href={`/${href}/${objetoId}`}
                className="flex gap-2 text-blue-600 hover:text-blue-800 py-1 px-3 border-2 border-blue-600 rounded-md"
            >
                <IconEye/>
                Ver
            </Link>
            <Link
                href={`/${href}/edit/${objetoId}`}
                className="flex gap-2 text-green-600 hover:text-green-800 py-1 px-3 border-2 border-green-600 rounded-md"
            >
                <IconPencil/>
                Editar
            </Link>
            {onExcluir && (
                <button
                    onClick={() => onExcluir(objetoId)}
                    className="flex gap-2 text-red-600 hover:text-red-800 py-1 px-3 border-2 border-red-600 rounded-md"
                >
                    <IconCancel/>
                    Excluir
                </button>
            )}
        </div>
    )
}