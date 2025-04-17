"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { OrdemCompra, Produto } from "@core"
import { produtoService } from "@/services/produtosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import semImagem from "@/../public/images/no-image.jpg"
import { ordemCompraService } from "@/services/ordensCompraService"
import { IconCross, IconPencil, IconX } from "@tabler/icons-react"

export default function DetalheProdutoPage() {
	const params = useParams()
	const router = useRouter()
	const [produto, setProduto] = useState<Produto | null>(null)
	const [ordensCompra, setOrdensCompra] = useState<OrdemCompra[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	const id = Array.isArray(params.id) ? params.id[0] : params.id

	useEffect(() => {
		async function carregarOrdensCompra() {
			try {
				const data = await ordemCompraService.obterTodas()
				setOrdensCompra(data)
			} catch (error) {
				console.error("Erro ao carregar pedidos em lista-ordens-compra:", error)
			}
		}
		carregarOrdensCompra()

		async function carregarProduto(id: string) {
			try {
				const data = await produtoService.obterPorId(id)
				setProduto(data)
			} catch (error) {
				console.error("Erro ao carregar produto:", error)
				setError("Não foi possível carregar os detalhes do produto.")
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			carregarProduto(id)
		}
	}, [id])

	function hasOrdensCompra(id: string): boolean {
		const ocs = ordensCompra.filter((oc) => oc.produtoId === id)
		return ocs.length > 0 ? true : false
	}

	const handleExcluir = async () => {
		if (!produto) return

		if (hasOrdensCompra(produto.id)) {
			alert("O produto não pode ser excluído, pois, existem OCs associadas!")
			return
		}

		if (confirm("Tem certeza que deseja excluir este produto?")) {
			try {
				await produtoService.excluir(produto.id)
				router.push("/produtos")
			} catch (error) {
				console.error("Erro ao excluir produto:", error)
				setError("Não foi possível excluir o produto.")
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
	if (!produto)
		return (
			<Container>
				<div>Produto não encontrado</div>
			</Container>
		)

	return (
		<Container className="flex-col">
			<HeaderPage titulo="Detalhes do Produto" textoBtn="Voltar para Lista" linkBtn="/produtos">
				<Link
					href={`/produtos/edit/${produto.id}`}
					className="flex gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
				>
					<IconPencil/>
					Editar
				</Link>
				<button
					onClick={handleExcluir}
					className="flex gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
				>
					<IconX/>
					Excluir
				</button>
			</HeaderPage>

			<div className="flex items-center gap-8 bg-white shadow rounded-lg p-6">
				<div className="w-[240px] h-[240px] relative">
					<Image
						src={!produto.imagemUrl ? semImagem : produto.imagemUrl}
						fill
						className="object-contain"
						alt={`Foto do produto ${produto.nome}`}
					/>
				</div>
				<div className="flex flex-col gap-6">
					<div>
						<h3 className="text-gray-500 font-medium">Produto</h3>
						<p className="text-lg">{produto.nome}</p>
					</div>

					<div className="flex gap-10">
						<div>
							<h3 className="text-gray-500 font-medium">Marca</h3>
							<p className="text-lg">{produto.marca || ""}</p>
						</div>
						<div>
							<h3 className="text-gray-500 font-medium">Peso</h3>
							<p className="text-lg">{produto.peso || ""}</p>
						</div>
					</div>

					<div className="md:col-span-2">
						<h3 className="text-gray-500 font-medium">Especificações</h3>
						<p className="text-lg">{produto.especificacoes || ""}</p>
					</div>
				</div>
			</div>
		</Container>
	)
}
