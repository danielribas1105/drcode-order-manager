'use client'
import { Supermercado, Usuario } from "@/core"
import Container from "../layout/container"
import BtnsSaveCancel from "../templates/btns-save-cancel"

export interface FormSupermercadoProps {
   supermercado: Partial<Supermercado>
   alteraSupermercado: (supermercado: Partial<Supermercado>) => void
   salvar: () => void
   cancelar: () => void
}

export default function FormSupermercado(props: FormSupermercadoProps) {
   const { supermercado, alteraSupermercado, salvar, cancelar } = props
   return (
      <Container className="flex-col">
         <div className="flex flex-col justify-between md:flex-row gap-4 items-center mb-4">
            <h2 className="title-page-default">SUPERMERCADOS CADASTRADOS</h2>
         </div>
         <div className="flex flex-1 flex-col font-texto">
            <div className="flex flex-1 gap-4">
               <div className="flex flex-1 flex-col">
                  <span>Supermercado:</span>
                  <input
                     className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
                     placeholder="Razão social"
                     onChange={ (e) => alteraSupermercado({ ...supermercado, razaoSocial: e.target.value})}
                     value={supermercado.razaoSocial ?? ""}
                  />
               </div>
               <div className="flex flex-col">
                  <span>Código do supermercado:</span>
                  <input
                     className="text-xl text-zinc-400 p-2 rounded-md border-2 outline-none read-only:bg-gray-100"
                     readOnly
                     value={supermercado.id ?? ""}
                  />
               </div>
            </div>
            <div className="flex flex-1 gap-4">
               <div className="flex flex-1 flex-col">
                  <span>CNPJ:</span>
                  <input
                     className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
                     placeholder="E-mail mais utilizado"
                     onChange={ (e) => alteraSupermercado({ ...supermercado, cnpj: e.target.value})}
                     value={supermercado.cnpj ?? ""}
                  />
               </div>
               <div className="flex flex-1 flex-col">
                  <span>CPF:</span>
                  <input
                     className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
                     placeholder="Apenas números"
                     onChange={ (e) => alteraSupermercado({ ...supermercado, idComprador: e.target.value})}
                     value={supermercado.idComprador ?? ""}
                  />
               </div>
            </div>
            <div className="flex flex-1 gap-4">
               <div className="flex flex-1 flex-col">
                  <span>Perfil:</span>
                  <select className="text-xl text-logo-black p-2 rounded-md border-2 outline-none"
                     defaultValue={supermercado.status ?? ""}
                     onChange={ 
                        (e) => alteraSupermercado({ ...supermercado, status: e.target.value as "Ativo" | "Bloqueado" | "Cancelado"})
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
                     defaultValue={supermercado.status ?? ""}
                     onChange={ 
                        (e) => alteraSupermercado({ ...supermercado, status: e.target.value as "Ativo" | "Bloqueado" | "Cancelado"})
                     }>
                     <option value="" disabled hidden>Selecione uma opção</option>
                     <option value="Ativo">Ativo</option>
                     <option value="Bloqueado">Bloqueado</option>
                     <option value="Cancelado">Cancelado</option>
                  </select>
               </div>
            </div>
         </div>
         <div className="flex flex-1 justify-end">
            <BtnsSaveCancel salvar={salvar} cancelar={cancelar}/>
         </div>
      </Container>
   )
}