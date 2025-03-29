export default interface OrdemCompra {
   id: string
   data: string
   precoPromocional: number
   prazo: number
   qtdePallets: number
   qtdeCaixasPallet: number
   entrega: string
   observacao?: string
   status: string
   idProduto: string
   idUsuario: string
}