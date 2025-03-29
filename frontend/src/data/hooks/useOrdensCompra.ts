import { useState } from "react"
import { OrdemCompra } from "@/core"
import listaOrdensCompra from "@/data/constants/ordensCompra"

export default function useOrdensCompra() {

   const [ordensCompra, setOrdensCompra] = useState<OrdemCompra[]>(listaOrdensCompra)

   return {
      ordensCompra
   }
}