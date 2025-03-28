import Image from "next/image"
import user from "@/../public/img-user.png"

export default function Avatar() {
	return (
		<div className="flex items-center gap-5">
			<span className="hidden md:block">Configurações</span>
			<div className="flex justify-center items-center w-10 h-10 rounded-full border-2 border-zinc-300">
				<Image src={user} width={40} height={40} alt="Imagem usuário" />
			</div>
		</div>
	)
}
