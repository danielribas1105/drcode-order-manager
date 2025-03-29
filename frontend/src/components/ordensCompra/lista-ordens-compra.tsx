'use client'
import { OrdemCompra } from "@/core"
import CardOrdemCompra from "./card-ordem-compra"

export interface ListaOrdensCompraProps {
   ordensCompra: OrdemCompra[]
   selecionarOrdemCompra: (ordemCompra: OrdemCompra) => void
   removerOrdemCompra: (ordemCompra: OrdemCompra) => void
}

export default function ListaOrdensCompra(props: ListaOrdensCompraProps) {

   return (
      <div className="flex flex-wrap justify-center gap-4">
         {props.ordensCompra.map((ordemCompra: OrdemCompra) => (
            <CardOrdemCompra
               key={ordemCompra.id}
               ordemCompra={ordemCompra}
               selecionarOrdemCompra={() => props.selecionarOrdemCompra(ordemCompra)}
               removerOrdemCompra={() => props.removerOrdemCompra(ordemCompra)}
            />
         ))}
      </div>
   )
}