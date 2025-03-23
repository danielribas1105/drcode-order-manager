export default interface Produto {
	id: string
	nome: string
	marca: string | null
	peso: string | null
	imagemUrl: string | null
	especificacoes: string | null
}
