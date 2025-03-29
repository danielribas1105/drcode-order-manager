'use client'
import { useState } from "react"
import { IconCornerUpLeft, IconPlus, IconSearch } from "@tabler/icons-react"
import { Produto } from "@/core"
import { GerarIds } from "@/utils"
import Container from "@/components/layout/container"
import ListaProdutos from "@/components/produtos/lista-produtos"
import FormProduto from "@/components/produtos/form-produto"
import BotaoLink from "@/components/templates/btn-link"
import listaProdutos from "@/data/constants/produtos"

export default function ProdutosPage() {

   const [produtoAtual, setProdutoAtual] = useState<Partial<Produto> | null>(null)
   const [produtos, setProdutos] = useState<Produto[]>(listaProdutos)
   const [pesquisa, setPesquisa] = useState('')

   const lowerCasePesquisa = pesquisa.toLowerCase()
   const produtosFiltrados = produtos.filter(
      (produto) => produto.nomeProduto.toLowerCase().startsWith(lowerCasePesquisa)
   )

   function selecionarProduto(produto: Partial<Produto>) {
      setProdutoAtual(produto)
   }

   function removerProduto(produtoRemovido: Produto) {
      const novaListaProdutos = produtos.filter((p) => p.id !== produtoRemovido.id)
      setProdutos(novaListaProdutos)
   }

   function salvarProduto() {
      const produtoExiste = produtos.find((p) => p.id === produtoAtual?.id)

      if (produtoExiste) {
         const novosProdutos = produtos.map((p) => {
            return p.id === produtoAtual?.id ? produtoAtual : p
         })
         setProdutos(novosProdutos as Produto[])
      } else {
         setProdutos([...produtos, produtoAtual as Produto])
      }
      setProdutoAtual(null)
   }

   function cancelar() {
      setProdutoAtual(null)
   }

   return (
      <Container className="flex-col">
         <div>
            {produtoAtual ? (
               <FormProduto
                  produto={produtoAtual}
                  alteraProduto={selecionarProduto}
                  salvar={salvarProduto}
                  cancelar={cancelar}
               />
            ) : (
               <>
                  <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-4">
                     <h2 className="title-page-default">PRODUTOS CADASTRADOS</h2>
                     <div className={'flex flex-1 gap-2 text-zinc-200 border-2 rounded-full overflow-hidden'}>
                        <input
                           value={pesquisa ?? ''}
                           placeholder="Buscar produto"
                           className="flex-1 text-zinc-700 bg-transparent outline-none px-4 py-1"
                           onChange={(e) => setPesquisa(e.target.value)}
                        />
                        <div className="flex justify-center items-center px-4">
                           <IconSearch size={24} stroke={3.0} className="text-logo-orange" />
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <button className="btn-default" onClick={() => selecionarProduto({ id: GerarIds.newId() })}>
                           <IconPlus size={24} />
                           {"Adicionar Produto"}
                        </button>
                        <BotaoLink link={"/home"} texto={"Voltar"} icon={IconCornerUpLeft} />
                     </div>
                  </div>
                  <ListaProdutos
                     produtos={produtosFiltrados?? produtos}
                     selecionarProduto={selecionarProduto}
                     removerProduto={removerProduto}
                  />
               </>
            )}
         </div>
      </Container>
   )
}