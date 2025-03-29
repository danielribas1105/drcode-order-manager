import { useState } from "react"
import { Supermercado } from "@/core"
import listaSupermercados from "@/data/constants/supermercados"

export default function useSupermercado() {

   const [supermercados, setSupermercados] = useState<Supermercado[]>(listaSupermercados)

   return {
      supermercados
   }
}