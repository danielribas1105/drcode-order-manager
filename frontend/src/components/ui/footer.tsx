import { IconCode, IconHeart, IconMug } from "@tabler/icons-react"
import Container from "../layout/container"

export default function Footer() {
	return (
		<footer className="my-6">
			<Container className="flex-col">
				<div className="flex gap-2 items-center justify-center md:justify-start">
					<p>Desenvolvido com</p>
					<IconHeart size={20} color="#ff0000" />
					<p>e</p>
					<IconMug size={22} color="#b5842a" />
					<p>por</p>
					<IconCode size={22} color="#5e17eb" />
					<p>DRCode</p>
				</div>
				<p>@2025 - Todos os direitos reservados</p>
			</Container>
		</footer>
	)
}
