export default interface OrdemCompra {
	id: string
	data: string
	preco: number
	prazo: number
	qtdeCaixasPallet: number
	qtdePallets: number
	entrega: string
	observacoes: string | null
	status: string
	produtoId: string
	usuarioId: string
}
