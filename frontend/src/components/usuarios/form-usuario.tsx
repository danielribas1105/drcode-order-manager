import Image from "next/image"
import { Usuario } from "@/core"
import Container from "../layout/container"
import BtnsSaveCancel from "../templates/btns-save-cancel"
import semImagem from "@/../public/images/img-user.png"

export interface FormUsuarioProps {
   usuario: Partial<Usuario>
   alteraUsuario: (usuario: Partial<Usuario>) => void
   salvar: () => void
   cancelar: () => void
}

export default function FormUsuario(props: FormUsuarioProps) {

   const { usuario, alteraUsuario, salvar, cancelar } = props
   const statusOptions = ["Ativo", "Bloqueado", "Cancelado"]

   return (
      <Container className="flex-col">
         <div className="flex flex-col justify-between md:flex-row gap-4 items-center mb-4">
            <h2 className="title-page-default">INFORMAÇÕES DO USUÁRIO</h2>
         </div>
         <div className="flex flex-1 gap-4 mb-6">
            <div className="w-60 h-60 relative bg-white border-2">
               <Image
                  src={usuario.imagemURL ?? semImagem}
                  fill
                  className="object-contain"
                  alt={`Foto de perfil ${usuario.nome}`}
               />
            </div>
            <div className="flex flex-1 flex-col font-texto">
               <div className="flex flex-1 gap-4">
                  <div className="flex flex-1 flex-col">
                     <span>Nome:</span>
                     <input
                        className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
                        placeholder="Nome"
                        onChange={ (e) => alteraUsuario({ ...usuario, nome: e.target.value})}
                        value={usuario.nome ?? ""}
                     />
                  </div>
                  <div className="flex flex-col">
                     <span>Código do usuário:</span>
                     <input
                        className="text-xl text-zinc-400 p-2 rounded-md border-2 outline-none read-only:bg-gray-100"
                        readOnly
                        value={usuario.id ?? ""}
                     />
                  </div>
               </div>
               <div className="flex flex-1 gap-4">
                  <div className="flex flex-1 flex-col">
                     <span>E-mail:</span>
                     <input
                        className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
                        placeholder="E-mail mais utilizado"
                        onChange={ (e) => alteraUsuario({ ...usuario, email: e.target.value})}
                        value={usuario.email ?? ""}
                     />
                  </div>
                  <div className="flex flex-1 flex-col">
                     <span>CPF:</span>
                     <input
                        className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
                        placeholder="Apenas números"
                        onChange={ (e) => alteraUsuario({ ...usuario, cpf: e.target.value})}
                        value={usuario.cpf ?? ""}
                     />
                  </div>
               </div>
               <div className="flex flex-1 gap-4">
                  <div className="flex flex-1 flex-col">
                     <span>Perfil:</span>
                     <select className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
                        defaultValue={usuario.perfil ?? ""}
                        onChange={ 
                           (e) => alteraUsuario({ ...usuario, perfil: e.target.value as "Admin" | "Comprador" | "Operacional"})
                        }>
                        <option value="" disabled hidden>Selecione uma opção</option>
                        <option value="Admin">Admin</option>
                        <option value="Comprador">Comprador</option>
                        <option value="Operacional">Operacional</option>
                     </select>
                  </div>
                  <div className="flex flex-1 flex-col">
                     <span>Status:</span>
                     <select className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
                        defaultValue={usuario.status ?? ""}
                        onChange={ 
                           (e) => alteraUsuario({ ...usuario, status: e.target.value as "Ativo" | "Bloqueado" | "Cancelado"})
                        }>
                        <option value="" disabled hidden>Selecione uma opção</option>
                        {statusOptions.map((status) => (
                           <option key={status} value={status}>{status}</option>
                        ))}
                     </select>
                  </div>
               </div>
            </div>
         </div>
         <div className="flex flex-1 justify-end">
            <BtnsSaveCancel salvar={salvar} cancelar={cancelar}/>
         </div>
      </Container>
   )
}