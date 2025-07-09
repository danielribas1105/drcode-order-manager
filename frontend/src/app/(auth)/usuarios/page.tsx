"use client"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import ListaUsuarios from "@/components/usuarios/lista-usuarios"
import { ordemCompraService } from "@/services/ordensCompraService"
import { pedidoService } from "@/services/pedidosService"
import { supermercadoService } from "@/services/supermercadosService"
import { usuarioService } from "@/services/usuariosService"
import { OrdemCompra, Pedido, Supermercado, Usuario } from "@core"
import { useEffect, useState } from "react"

export default function UsuariosPage() {
	const [usuarios, setUsuarios] = useState<Usuario[]>([])
	const [pedidos, setPedidos] = useState<Pedido[]>([])
	const [supermercados, setSupermercados] = useState<Supermercado[]>([])
	const [ordensCompra, setOrdensCompra] = useState<OrdemCompra[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function carregarDados() {
			console.log("carregarUsuarios")
			try {
				const [usuariosRes, pedidosRes, supermercadosRes, ordensCompraRes] = await Promise.all([
					usuarioService.obterTodos(),
					pedidoService.obterTodos(),
					supermercadoService.obterTodos(),
					ordemCompraService.obterTodas(),
				])
				setUsuarios(usuariosRes)
				setPedidos(pedidosRes)
				setSupermercados(supermercadosRes)
				setOrdensCompra(ordensCompraRes)
			} catch (error) {
				console.error("Erro ao carregar dados:", error)
			} finally {
				setLoading(false)
			}
		}

		carregarDados()
	}, [])

	if (loading) return <div>Carregando...</div>

	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Usuários Cadastrados"
				textofiltro={"Pesquisar usuário"}
				textoBtn="Adicionar Usuário"
				linkBtn="/usuarios/add"
			/>
			<ListaUsuarios
				usuarios={usuarios}
				pedidos={pedidos}
				supermercados={supermercados}
				ordensCompra={ordensCompra}
				setUsuarios={setUsuarios}
			/>
		</Container>
	)
}
