import Container from "@/components/layout/container"
import ListaSupermercados from "@/components/supermercado/lista-supermercado"
import { obterSupermercados } from "@/functions/supermercados"

export default async function SupermercadosPage() {
	const listaSupermercados = await obterSupermercados()
	return (
		<Container className="flex-col">
			<ListaSupermercados supermercados={listaSupermercados.allSupermercados} />
		</Container>
	)
}
