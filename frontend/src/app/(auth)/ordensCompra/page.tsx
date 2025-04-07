"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { OrdemCompra } from "@core"
import { ordemCompraService } from "@/services/ordensCompraService"
import Container from "@/components/layout/container"
import ListaOrdensCompra from "@/components/ordensCompra/lista-ordens-compra"
import HeaderPage from "@/components/templates/header-page"

export default function OrdensCompraPage() {
	const [ordensCompra, setOrdensCompra] = useState<OrdemCompra[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function carregarOrdensCompra() {
			console.log("carregarOrdensCompra")
			try {
				const data = await ordemCompraService.obterTodas()
				console.log("data " + data)
				setOrdensCompra(data)
			} catch (error) {
				console.error("Erro ao carregar ordens de compra:", error)
			} finally {
				setLoading(false)
			}
		}

		carregarOrdensCompra()
	}, [])

	const handleExcluir = async (id: string) => {
		if (confirm("Tem certeza que deseja excluir esta ordem de compra?")) {
			try {
				await ordemCompraService.excluir(id)
				setOrdensCompra(ordensCompra.filter((ordem) => ordem.id !== id))
			} catch (error) {
				console.error("Erro ao excluir ordem de compra:", error)
			}
		}
	}

	if (loading) return <div>Carregando...</div>

	return (
		<>
			{/* <div>
				<h1>Ordens de Compra</h1>
				<Link href="/ordens_compra/nova">Nova Ordem de Compra</Link>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>ProdutoId</th>
							<th>Data</th>
							<th>Preço</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{ordensCompra.map((ordem) => (
							<tr key={ordem.id}>
								<td>{ordem.id}</td>
								<td>{ordem.produtoId}</td>
								<td>{new Date(ordem.data).toLocaleDateString()}</td>
								<td>
									{ordem.preco.toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL",
									})}
								</td>
								<td>
									<Link href={`/ordens_compra/${ordem.id}`}>Detalhes</Link>
									<Link href={`/ordens_compra/${ordem.id}/editar`}>Editar</Link>
									<button onClick={() => handleExcluir(ordem.id)}>Excluir</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div> */}
			<Container className="flex-col">
				<HeaderPage
					titulo="OCs Cadastradas"
					textoBtn="Adicionar OC"
					textofiltro={"Pesquisar Ordem Compra"}
				/>
				<ListaOrdensCompra ordensCompra={ordensCompra} />
			</Container>
		</>
	)
}
