'use client'
import { useState } from "react"
import { Supermercado } from "@/core"
import { GerarIds } from "@/utils"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import FormSupermercado from "@/components/supermercado/form-supermercado"
import ListaSupermercados from "@/components/supermercado/lista-supermercado"
import listaSupermercados from "@/data/constants/supermercados"

export default function SupermercadosPage() {

   const [supermercadoAtual, setSupermercadoAtual] = useState<Partial<Supermercado> | null>(null)
   const [supermercados, setSupermercados] = useState<Supermercado[]>(listaSupermercados)

   function selecionarSupermercado(supermercado: Partial<Supermercado>) {
      setSupermercadoAtual(supermercado)
   }

   function removerSupermercado(supermercadoRemovido: Supermercado) {
      debugger
      const novaListaSupermercados = supermercados.filter((s) => s.id !== supermercadoRemovido.id)
      setSupermercados(novaListaSupermercados)
   }

   function salvarSupermercado() {
      const supermercadoExiste = supermercados.find((s) => s.id === supermercadoAtual?.id)

      if (supermercadoExiste) {
         const novosSupermercados = supermercados.map((s) => {
            return s.id === supermercadoAtual?.id ? supermercadoAtual : s
         })
         setSupermercados(novosSupermercados as Supermercado[])
      } else {
         setSupermercados([...supermercados, supermercadoAtual as Supermercado])
      }
      setSupermercadoAtual(null)
   }

   function cancelar() {
      setSupermercadoAtual(null)
   }

   return (
      <Container className="flex-col">
         <div>
            {supermercadoAtual ? (
               <FormSupermercado
                  supermercado={supermercadoAtual}
                  alteraSupermercado={selecionarSupermercado}
                  salvar={salvarSupermercado}
                  cancelar={cancelar}
               />
            ) : (
               <>
                  <HeaderPage
                     titulo="SUPERMERCADOS CADASTRADOS"
                     textoBtn="Adicionar Supermercado"
                     placeholder="Buscar supermercado"
                     functionBtn={() => selecionarSupermercado({ id: GerarIds.newId() })}
                  />
                  <ListaSupermercados
                     supermercados={supermercados}
                     selecionarSupermercado={selecionarSupermercado}
                     removerSupermercado={removerSupermercado}
                  />
               </>
            )}
         </div>
      </Container>
   )
}