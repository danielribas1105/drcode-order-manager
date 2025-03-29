'use client'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'

export interface FiltroProdutoProps {
   className?: string
   placeholder: string
}

export default function FiltroProduto(props: FiltroProdutoProps) {
   const [ busca, setBusca ] = useState('')
   //const { pesquisa, setPesquisa } = useProdutos()
   return (
      <div className={`flex flex-1 gap-2 text-zinc-200 border-2 rounded-full overflow-hidden ${props.className ?? ''}`}>
         <input
            value={busca} /* pesquisa ?? '' */
            /* onChange={(e) => setPesquisa(e.target.value)} */
            placeholder={props.placeholder}
            className="flex-1 text-zinc-700 bg-transparent outline-none px-4 py-1"
            onChange={(e) => setBusca(e.target.value)}
         />
         <div className="flex justify-center items-center px-4">
            <IconSearch size={24} stroke={3.0} className="text-logo-orange" />
         </div>
      </div>
   )
}
