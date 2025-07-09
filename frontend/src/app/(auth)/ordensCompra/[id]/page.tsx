"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { OrdemCompra, Produto, Usuario } from "@core"
import { ordemCompraService } from "@/services/ordensCompraService"
import { produtoService } from "@/services/produtosService"
import { IconPencil, IconX } from "@tabler/icons-react"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import { usuarioService } from "@/services/usuariosService"
import { Moeda } from "@/utils"

export default function DetalheOrdemCompraPage() {
	const params = useParams()
	const router = useRouter()
	const [ordemCompra, setOrdemCompra] = useState<OrdemCompra | null>(null)
	const [produtos, setProdutos] = useState<Produto[]>([])
	const [usuarios, setUsuarios] = useState<Usuario[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	const id = Array.isArray(params.id) ? params.id[0] : params.id

	useEffect(() => {
		async function carregarProdutos() {
			try {
				const data = await produtoService.obterTodos()
				setProdutos(data)
			} catch (error) {
				console.error("Erro ao carregar produto:", error)
				setError("Não foi possível carregar os detalhes do produto.")
			} finally {
				setLoading(false)
			}
		}
		carregarProdutos()

		async function carregarUsuarios() {
			try {
				const data = await usuarioService.obterTodos()
				setUsuarios(data)
			} catch (error) {
				console.error("Erro ao carregar usuário:", error)
				setError("Não foi possível carregar os detalhes do usuário.")
			} finally {
				setLoading(false)
			}
		}
		carregarUsuarios()

		async function carregarOrdemCompra(id: string) {
			try {
				const data = await ordemCompraService.obterPorId(id)
				setOrdemCompra(data)
			} catch (error) {
				console.error("Erro ao carregar ordem de compra:", error)
				setError("Não foi possível carregar os detalhes da ordem de compra.")
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			carregarOrdemCompra(id)
		}
	}, [id])

	function findProduto(id: string): string {
		const produto = produtos.find((p) => p.id === id)
		return produto ? produto.nome : "Produto não encontrado"
	}

	function findUsuario(id: string): string {
		const usuario = usuarios.find((u) => u.id === id)
		return usuario ? usuario.nome : "Usuário não encontrado"
	}

	const handleExcluir = async () => {
		if (!ordemCompra) return

		if (confirm("Tem certeza que deseja excluir esta ordem de compra?")) {
			try {
				await ordemCompraService.excluir(ordemCompra.id)
				router.push("/ordensCompra")
			} catch (error) {
				console.error("Erro ao excluir ordem de compra:", error)
				setError("Não foi possível excluir a ordem de compra.")
			}
		}
	}

	if (loading) return <Container>Carregando...</Container>
	if (error)
		return (
			<Container>
				<div className="text-red-600">{error}</div>
			</Container>
		)
	if (!ordemCompra)
		return (
			<Container>
				<div>Ordem de compra não encontrada</div>
			</Container>
		)

	return (
		<Container className="flex-col">
			<HeaderPage titulo="Detalhes da OC" textoBtn="Voltar para Lista" linkBtn="/ordensCompra">
				<Link
					href={`/ordensCompra/edit/${ordemCompra.id}`}
					className="flex gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
				>
					<IconPencil />
					Editar
				</Link>
				<button
					onClick={handleExcluir}
					className="flex gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
				>
					<IconX />
					Excluir
				</button>
			</HeaderPage>

			<div className="flex flex-col gap-4 w-full bg-white shadow rounded-lg p-6">
				<div className="flex">
					<div className="flex-1">
						<h3 className="text-gray-500 font-medium">Ordem Compra/Produto</h3>
						<p className="text-lg">{findProduto(ordemCompra.produtoId)}</p>
					</div>
					<div className="flex-1">
						<h3 className="text-gray-500 font-medium">Preço</h3>
						<p className="text-lg">{Moeda.formatar(ordemCompra.preco)}</p>
					</div>
					<div className="flex-1">
						<h3 className="text-gray-500 font-medium">Data</h3>
						<p className="text-lg">{ordemCompra.data}</p>
					</div>
				</div>

				<div className="flex">
					<div className="flex-1">
						<h3 className="text-gray-500 font-medium">Quant. Caixas</h3>
						<p className="text-lg">{ordemCompra.qtdeCaixasPallet}</p>
					</div>
					<div className="flex-1">
						<h3 className="text-gray-500 font-medium">Quant. Pallets</h3>
						<p className="text-lg">{ordemCompra.qtdePallets}</p>
					</div>
					<div className="flex-1">
						<h3 className="text-gray-500 font-medium">Prazo</h3>
						<p className="text-lg">{ordemCompra.prazo}</p>
					</div>
				</div>

				<div className="flex">
					<div className="flex-1">
						<h3 className="text-gray-500 font-medium">Prazo</h3>
						<p className="text-lg">{ordemCompra.entrega}</p>
					</div>
					<div className="flex-1">
						<h3 className="text-gray-500 font-medium">Status</h3>
						<p className="text-lg">{ordemCompra.status}</p>
					</div>
					<div className="flex-1">
						<h3 className="text-gray-500 font-medium">Usuário</h3>
						<p className="text-lg">{findUsuario(ordemCompra.usuarioId)}</p>
					</div>
				</div>
			</div>
			<div className="flex justify-center mt-10">
				LOCAL PARA A TABELA COM OS PEDIDOS REALIZADOS PARA ESTA OC
			</div>
		</Container>
	)
}
