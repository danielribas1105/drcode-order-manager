import { produtoService } from "@/services/produtosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import ListaProdutos from "@/components/produtos/lista-produtos"
import { ordemCompraService } from "@/services/ordensCompraService"

export default async function ProdutosPage() {
	const produtos = await produtoService.obterTodos()
	const ordensCompra = await ordemCompraService.obterTodas()
	/* const [produtos, setProdutos] = useState<Produto[]>([])
	const [loading, setLoading] = useState(true) */

	/* useEffect(() => {
		async function carregarProdutos() {
			console.log("carregarProdutos")
			try {
				const data = await produtoService.obterTodos()
				setProdutos(data)
			} catch (error) {
				console.error("Erro ao carregar produtos:", error)
			} finally {
				setLoading(false)
			}
		}

		carregarProdutos()
	}, []) */

	//if (loading) return <div>Carregando...</div>

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Produtos Cadastrados"
				textofiltro={"Pesquisar produto"}
				textoBtn="Adicionar Produto"
				linkBtn="/produtos/add"
			/>
			<ListaProdutos produtos={produtos} ordensCompra={ordensCompra} />
		</Container>
	)
}
