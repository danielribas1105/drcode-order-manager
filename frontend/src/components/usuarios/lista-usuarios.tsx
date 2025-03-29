'use client'
import { Usuario } from "@/core"
import CardUsuario from "./card-usuario"

export interface ListaUsuariosProps {
   usuarios: Usuario[]
   selecionarUsuario: (usuario: Usuario) => void
   removerUsuario: (usuario: Usuario) => void
}

export default function ListaUsuarios(props: ListaUsuariosProps) {

   return (
      <div className="flex flex-wrap justify-center gap-4">
         {props.usuarios.map((usuario: Usuario) => (
            <CardUsuario
               key={usuario.id}
               usuario={usuario}
               selecionarUsuario={() => props.selecionarUsuario(usuario)}
               removerUsuario={() => props.removerUsuario(usuario)}
            />
         ))}
      </div>
   )
}