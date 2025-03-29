'use client'
import { Produto } from "@/core"
import CardProduto from "./card-produto"

export interface ListaProdutosProps {
   produtos: Produto[]
   selecionarProduto: (produto: Produto) => void
   removerProduto: (produto: Produto) => void
}

export default function ListaProdutos(props: ListaProdutosProps) {

   return (
      <div className="flex flex-wrap justify-center gap-4">
         {props.produtos.map((produto: Produto) => (
            <CardProduto 
               key={produto.id} 
               produto={produto} 
               selecionarProduto={() => props.selecionarProduto(produto)}
               removerProduto={() => props.removerProduto(produto)}
            />
         ))}
      </div>
   )
}