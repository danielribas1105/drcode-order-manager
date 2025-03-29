'use client'
import Image from "next/image"
import { Produto } from "@/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import semImagem from "@/../public/images/no-image.jpg"

export interface CardProdutoProps {
   produto: Produto
   selecionarProduto: (produto: Produto) => void
   removerProduto: (produto: Produto) => void
}

export default function CardProduto(props: CardProdutoProps) {
   const { produto } = props
   return (
      <div className="w-64 h-72 bg-zinc-100 border-2 rounded-3xl p-2 text-zinc-800 hover:shadow-xl hover:shadow-logo-black/30">
         <div className="w-full h-24 relative bg-white">
            <Image
               src={produto.imagemURL ?? semImagem}
               fill
               className="object-contain"
               alt="Foto do produto"
            />
         </div>
         <div className="h-14 my-2 text-xl text-center border-t">
            {produto.nomeProduto}
         </div>
         <div className="flex flex-col gap-1 mb-3">
            <div className="flex gap-2">
               <span>Marca:</span>
               <span>{produto.marca}</span>
            </div>
            <div className="flex gap-2">
               <span>Peso:</span>
               <span>{produto.peso}</span>
            </div>
         </div>
         <div className="flex justify-center mb-1">
            <div className="flex gap-2 items-center">
               <button
                  className="flex justify-center items-center gap-1 px-2 py-1 font-logo text-lg text-logo-white bg-blue-400 hover:bg-blue-600 border-2 rounded-md"
                  onClick={(e) => {
                     e.preventDefault()
                     props.selecionarProduto(produto)
                  }}>
                  <IconEdit size={20} />
                  <span>Editar</span>
               </button>
               <button
                  className="flex justify-center items-center gap-1 px-2 py-1 font-logo text-lg text-logo-white bg-red-400 hover:bg-red-600 border-2 rounded-md"
                  onClick={(e) => {
                     e.preventDefault()
                     props.removerProduto(produto)
                  }}>
                  <IconTrash size={20} />
                  <span>Excluir</span>
               </button>
            </div>
         </div>
      </div>
   )
}