import semImagem from "@/../public/images/img-user.png"
import { usuarioService } from "@/services/usuariosService"
import { OrdemCompra, Pedido, Supermercado, Usuario } from "@core"
import Image from "next/image"
import BtnsGroup from "../templates/btns-group"
import Alert from "../ui/alert"
import { useState } from "react"

export interface ListaUsuariosProps {
	usuarios: Usuario[]
	pedidos: Pedido[]
	supermercados: Supermercado[]
	ordensCompra: OrdemCompra[]
	setUsuarios: (usuarios: Usuario[]) => void
}

export default function ListaUsuarios({
	usuarios,
	pedidos,
	supermercados,
	ordensCompra,
	setUsuarios,
}: ListaUsuariosProps) {
	const [alert, setAlert] = useState(false)

	function hasPedido(id: string): boolean {
		return pedidos.some((pedido) => pedido.usuarioId === id)
	}
	function hasSupermercado(id: string): boolean {
		return supermercados.some((supermercado) => supermercado.usuarioId === id)
	}
	function hasOrdemCompra(id: string): boolean {
		return ordensCompra.some((oc) => oc.usuarioId === id)
	}

	const handleExcluir = async (id: string) => {
		if (hasPedido(id) || hasSupermercado(id) || hasOrdemCompra(id)) {
			setAlert(true)
			return
		}
		if (confirm("Tem certeza que deseja excluir este usuário?")) {
			try {
				await usuarioService.excluir(id)
				setUsuarios(usuarios.filter((usuario) => usuario.id !== id))
			} catch (error) {
				console.error("Erro ao excluir usuário:", error)
			}
		}
	}

	return (
		<>
			{alert && (
				<Alert
					titulo="Operação cancelada!"
					texto="O usuário não pode ser excluído, pois, existem dados associados a esse."
					cancel={false}
					open={alert}
					onOpenChange={setAlert}
				/>
			)}
			<ul className="flex flex-col gap-2">
				{usuarios.length > 0 ? (
					usuarios.map((usuario) => (
						<li
							key={usuario.id}
							className="flex flex-col md:flex-row md:justify-between py-3 px-4 border-2 border-zinc-200 rounded-lg hover:bg-gray-50"
						>
							<div className="flex gap-2 items-center">
								<div className="w-12 h-12 relative bg-white">
									<Image
										src={usuario.imagemUrl === "" ? semImagem : usuario.imagemUrl}
										fill
										className="object-contain"
										alt={`Foto de perfil ${usuario.nome}`}
									/>
								</div>
								<div>
									<span className="font-bold text-lg py-3 px-4">{usuario.nome}</span>
									<div className="text-base text-zinc-400">
										<span className="py-3 px-4">{usuario.email}</span>
										<span className="py-3 px-4">Perfil: {usuario.perfil}</span>
										<span className="py-3 px-4">Status: {usuario.status}</span>
									</div>
								</div>
							</div>
							<BtnsGroup href="usuarios" objeto={usuario} onExcluir={handleExcluir} />
						</li>
					))
				) : (
					<span className="py-4 px-4 text-center text-gray-500">Nenhum usuário encontrado</span>
				)}
			</ul>
		</>
	)
}
