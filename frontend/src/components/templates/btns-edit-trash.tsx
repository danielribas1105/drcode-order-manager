'use client'
import { IconEdit, IconTrash } from "@tabler/icons-react"

export default function BtnsEditTrash() {
   return (
      <div className="flex gap-2 items-center">
         <button
            className="flex justify-center items-center gap-1 px-2 py-1 font-logo text-lg text-logo-white bg-blue-400 hover:bg-blue-600 border-2 rounded-md"
            onClick={(e) => {
               e.preventDefault()
               console.log('Editar usuario')
               /* adicionarItem(props.produto) */
            }}>
            <IconEdit size={20} />
            <span>Editar</span>
         </button>
         <button
            className="flex justify-center items-center gap-1 px-2 py-1 font-logo text-lg text-logo-white bg-red-400 hover:bg-red-600 border-2 rounded-md"
            onClick={(e) => {
               e.preventDefault()
               console.log('excluir usuario')
               /* adicionarItem(props.produto) */
            }}>
            <IconTrash size={20} />
            <span>Excluir</span>
         </button>
      </div>
   )
}