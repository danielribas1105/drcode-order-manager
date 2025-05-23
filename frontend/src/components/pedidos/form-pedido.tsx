"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { OrdemCompra, Pedido, Produto, Supermercado, Usuario } from "@core"
import { GerarDatas, GerarIds } from "@/utils"
import { pedidoService } from "@/services/pedidosService"
import { produtoService } from "@/services/produtosService"
import { usuarioService } from "@/services/usuariosService"
import { ordemCompraService } from "@/services/ordensCompraService"
import { supermercadoService } from "@/services/supermercadosService"
import { IconCancel, IconCheck } from "@tabler/icons-react"

export interface PedidoFormProps {
	pedido?: Pedido
	isEditing?: boolean
}

export default function PedidoForm({ pedido, isEditing = false }: PedidoFormProps) {
	const router = useRouter()
	const [ordensCompra, setOrdensCompra] = useState<OrdemCompra[]>([])
	const [produtos, setProdutos] = useState<Produto[]>([])
	const [usuarios, setUsuarios] = useState<Usuario[]>([])
	const [supermercados, setSupermercados] = useState<Supermercado[]>([])
	const [formState, setFormState] = useState({
		id: GerarIds.newId(),
		ordemCompraId: "",
		usuarioId: "",
		data: GerarDatas.dataHoraMinuto(),
		supermercadoId: "",
		qtdeCaixas: 0,
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		async function carregarOrdensCompra() {
			try {
				const data = await ordemCompraService.obterTodas()
				setOrdensCompra(data)
			} catch (error) {
				console.error("Erro ao carregar ordens de compra em form-pedido:", error)
			}
		}
		carregarOrdensCompra()

		async function carregarProdutos() {
			try {
				const data = await produtoService.obterTodos()
				setProdutos(data)
			} catch (error) {
				console.error("Erro ao carregar produtos em form-pedido:", error)
			}
		}
		carregarProdutos()

		async function carregarUsuarios() {
			try {
				const data = await usuarioService.obterTodos()
				setUsuarios(data)
			} catch (error) {
				console.error("Erro ao carregar usuários em form-pedido:", error)
			}
		}
		carregarUsuarios()

		async function carregarSupermercados() {
			try {
				const data = await supermercadoService.obterTodos()
				setSupermercados(data)
			} catch (error) {
				console.error("Erro ao carregar usuários em form-pedido:", error)
			}
		}
		carregarSupermercados()

		if (pedido) {
			setFormState({
				id: pedido.id,
				ordemCompraId: pedido.ordemCompraId || "",
				usuarioId: pedido.usuarioId || "",
				supermercadoId: pedido.supermercadoId || "",
				data: pedido.data || "",
				qtdeCaixas: pedido.qtdeCaixas || 0,
			})
		}
	}, [pedido])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormState((prev) => ({
			...prev,
			[name]: name === "qtdeCaixas" ? Number(value) : value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setError("")

		try {
			if (isEditing && pedido) {
				await pedidoService.atualizar(pedido.id, formState)
			} else {
				await pedidoService.criar(formState)
			}
			router.push("/pedidos")
			router.refresh()
		} catch (error) {
			console.error("Erro ao salvar pedido:", error)
			setError("Ocorreu um erro ao salvar o pedido. Tente novamente.")
		} finally {
			setIsSubmitting(false)
		}
	}

	function findNomeProduto(id: string): string {
		const produto = produtos.find((produto) => produto.id === id)
		return produto ? produto.nome : "Produto não encontrado"
	}

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			<div className="mb-4">
				<label htmlFor="ordemCompraId" className="block text-gray-700 font-medium mb-2">
					Ordem Compra/Produto *
				</label>
				<select
					id="ordemCompraId"
					name="ordemCompraId"
					value={formState.ordemCompraId}
					onChange={handleChange}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="" disabled>
						Selecione um produto
					</option>
					{ordensCompra.map((oc) => (
						<option key={oc.id} value={oc.id}>
							{findNomeProduto(oc.produtoId)}
						</option>
					))}
				</select>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label htmlFor="usuarioId" className="block text-gray-700 font-medium mb-2">
						Comprador
					</label>
					<select
						id="usuarioId"
						name="usuarioId"
						value={formState.usuarioId}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="" disabled>
							Selecione um usuário
						</option>
						{usuarios.map((usuario) => (
							<option key={usuario.id} value={usuario.id}>
								{usuario.nome}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="data" className="block text-gray-700 font-medium mb-2">
						Data
					</label>
					<input
						type="text"
						id="data"
						name="data"
						value={formState.data}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>

			<div className="mb-4">
				<label htmlFor="supermercadoId" className="block text-gray-700 font-medium mb-2">
					Supermercado
				</label>
				<select
					id="supermercadoId"
					name="supermercadoId"
					value={formState.supermercadoId}
					onChange={handleChange}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="" disabled>
						Selecione um supermercado
					</option>
					{supermercados.map((supermercado) => (
						<option key={supermercado.id} value={supermercado.id}>
							{supermercado.razaoSocial}
						</option>
					))}
				</select>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label htmlFor="qtdeCaixas" className="block text-gray-700 font-medium mb-2">
						Quantidade de caixas
					</label>
					<input
						type="text"
						id="qtdeCaixas"
						name="qtdeCaixas"
						value={formState.qtdeCaixas}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>

			<div className="flex justify-end gap-4">
				<button
					type="button"
					onClick={() => router.back()}
					className="flex gap-2 itens-center px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white border-2 border-red-600 rounded-md"
				>
					<IconCancel/>
					Cancelar
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className="flex gap-2 itens-center px-4 py-2 text-green-600 hover:bg-green-600 hover:text-white border-2 border-green-600 rounded-md disabled:bg-green-400"
				>
					<IconCheck/>
					{isSubmitting ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
				</button>
			</div>
		</form>
	)
}
