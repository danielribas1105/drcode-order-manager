'use client'
import { Supermercado } from "@/core"
import CardSupermercado from "./card-supermercado"

export interface ListaSupermercadosProps {
   supermercados: Supermercado[]
   selecionarSupermercado: (supermercado: Supermercado) => void
   removerSupermercado: (supermercado: Supermercado) => void
}

export default function ListaSupermercados(props: ListaSupermercadosProps) {

   return (
      <div className="flex flex-wrap justify-center gap-4">
         {props.supermercados.map((supermercado: Supermercado) => (
            <CardSupermercado
               key={supermercado.id}
               supermercado={supermercado}
               selecionarSupermercado={() => props.selecionarSupermercado(supermercado)}
               removerSupermercado={() => props.removerSupermercado(supermercado)}
            />
         ))}
      </div>
   )
}