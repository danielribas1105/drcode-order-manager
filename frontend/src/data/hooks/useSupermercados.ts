import { useState } from "react"
import { Supermercado } from "@/core"
import TabelaSupermercados from "@/data/constants/supermercados"

export default function useSupermercado() {

   const [supermercados, setSupermercados] = useState<Supermercado[]>(TabelaSupermercados)

   return {
      supermercados
   }
}