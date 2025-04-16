import Image from "next/image"
import { Usuario } from "@core"
import BtnsGroup from "../templates/btns-group"
import semImagem from "@/../public/images/img-user.png"


export interface ListaUsuariosProps {
	usuarios: Usuario[]
	onExcluir?: (id: string) => void
}

export default function ListaUsuarios({ usuarios, onExcluir }: ListaUsuariosProps) {
	return (
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
						<BtnsGroup href="usuarios" objeto={usuario} onExcluir={onExcluir} />
					</li>
				))
			) : (
				<span className="py-4 px-4 text-center text-gray-500">Nenhum usuário encontrado</span>
			)}
		</ul>
	)
}
