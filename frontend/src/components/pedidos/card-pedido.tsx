'use client'
import { OrdemCompra, Pedido } from "@/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import listaOrdensCompra from "@/data/constants/ordensCompra"

export interface CardPedidoProps {
   pedido: Pedido
   selecionarPedido: (pedido: Pedido) => void
   removerPedido: (pedido: Pedido) => void
}

export default function CardPedido(props: CardPedidoProps) {
   const { pedido } = props

   function selecionarNomeProduto(listaOrdensCompra: OrdemCompra[], idOrdemCompra: string): string {
        let nomeProduto = ''
        listaOrdensCompra.forEach(oc => {
            if(oc.id === idOrdemCompra) {
                nomeProduto = 'encontrar o nome do produto'
            }
        });
        return nomeProduto
   }
   
   return (
      <div className="flex flex-col justify-between w-64 h-80 bg-zinc-100 border-2 rounded-3xl p-2 text-zinc-800 hover:shadow-xl hover:shadow-logo-black/30">
         <div className="h-14 my-2 text-xl text-center">
            {pedido.id}
         </div>
         <div className="flex flex-col gap-1 mb-3">
            <div className="flex gap-2">
               <span>Produto:</span>
               <span>{selecionarNomeProduto(listaOrdensCompra, pedido.idOrdemCompra)}</span>
            </div>
            <div className="flex gap-2">
               <span>Código:</span>
               <span>{pedido.id}</span>
            </div>
         </div>
         <div className="flex justify-center mb-1">
            <div className="flex gap-2 items-center">
               <button
                  className="flex justify-center items-center gap-1 px-2 py-1 font-logo text-lg text-logo-white bg-blue-400 hover:bg-blue-600 border-2 rounded-md"
                  onClick={(e) => {
                     e.preventDefault()
                     props.selecionarPedido(pedido)
                  }}>
                  <IconEdit size={20} />
                  <span>Editar</span>
               </button>
               <button
                  className="flex justify-center items-center gap-1 px-2 py-1 font-logo text-lg text-logo-white bg-red-400 hover:bg-red-600 border-2 rounded-md"
                  onClick={(e) => {
                     e.preventDefault()
                     props.removerPedido(pedido)
                  }}>
                  <IconTrash size={20} />
                  <span>Excluir</span>
               </button>
            </div>
         </div>
      </div>
   )
}