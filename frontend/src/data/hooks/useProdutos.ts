import { useState } from "react"
import { Produto } from "@core"
import TabelaProdutos from "@/data/constants/produtos"

export default function useProdutos() {

   const [produtos, setProdutos] = useState<Produto[]>(TabelaProdutos)

   return {
      produtos
   }
}