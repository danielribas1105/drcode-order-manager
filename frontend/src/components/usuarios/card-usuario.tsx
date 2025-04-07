"use client"
import Image from "next/image"
import { Usuario } from "@core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import semImagem from "@/../public/images/img-user.png"

export interface CardUsuarioProps {
	usuario: Usuario
}

export default function CardUsuario(props: CardUsuarioProps) {
	const { usuario } = props
	return (
		<div className="w-64 h-80 bg-zinc-100 border-2 rounded-3xl p-2 text-zinc-800 hover:shadow-xl hover:shadow-logo-black/30">
			<div className="w-full h-24 relative bg-white">
				<Image
					src={usuario.imagemUrl === "" ? semImagem : usuario.imagemUrl}
					fill
					className="object-contain"
					alt={`Foto de perfil ${usuario.nome}`}
				/>
			</div>
			<div className="h-14 my-2 text-xl text-center border-t">{usuario.nome}</div>
			<div className="flex flex-col gap-1 mb-3">
				<div className="flex gap-2">
					<span>CPF:</span>
					<span>{usuario.cpf}</span>
				</div>
				<div className="flex gap-2">
					<span>Perfil:</span>
					<span>{usuario.perfil}</span>
				</div>
				<div className="flex gap-2">
					<span>Status:</span>
					<span>{usuario.status}</span>
				</div>
			</div>
			<div className="flex justify-center mb-1">
				<div className="flex gap-2 items-center">
					<button
						className="flex justify-center items-center gap-1 px-2 py-1 font-logo text-lg text-logo-white bg-blue-400 hover:bg-blue-600 border-2 rounded-md"
						onClick={(e) => {
							e.preventDefault()
							//props.selecionarUsuario(usuario)
						}}
					>
						<IconEdit size={20} />
						<span>Editar</span>
					</button>
					<button
						className="flex justify-center items-center gap-1 px-2 py-1 font-logo text-lg text-logo-white bg-red-400 hover:bg-red-600 border-2 rounded-md"
						onClick={(e) => {
							e.preventDefault()
							//props.removerUsuario(usuario)
						}}
					>
						<IconTrash size={20} />
						<span>Excluir</span>
					</button>
				</div>
			</div>
		</div>
	)
}
