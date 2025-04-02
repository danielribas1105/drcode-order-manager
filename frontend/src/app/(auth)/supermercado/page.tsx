import Container from "@/components/layout/container"
import ListaSupermercados from "@/components/supermercado/lista-supermercado"
import HeaderPage from "@/components/templates/header-page"
import { obterSupermercados } from "@/functions/supermercados"

export default async function SupermercadosPage() {
	const listaSupermercados = await obterSupermercados()
	return (
		<Container className="flex-col">
			<HeaderPage
				titulo="Supermercados Cadastradas"
				textoBtn="Adicionar Supermercado"
				textofiltro={"Pesquisar Supermercado"}
			/>
			<ListaSupermercados supermercados={listaSupermercados.allSupermercados} />
		</Container>
	)
}
