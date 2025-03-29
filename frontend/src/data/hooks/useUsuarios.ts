import { useState } from "react"
import { Usuario } from "@/core"
import listaUsuarios from "@/data/constants/usuarios"

export default function useUsuarios() {

   const [usuarios, setUsuarios] = useState<Usuario[]>(listaUsuarios)

   return {
      usuarios
   }
}