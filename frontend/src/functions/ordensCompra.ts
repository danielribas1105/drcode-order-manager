import { OrdemCompra } from "@core"
import { httpGet } from "./api"

export async function obterOrdensCompra() {
	const ordensCompra: OrdemCompra[] = await httpGet("/ordens_compra")

	return {
		allOrdensCompra: ordensCompra,
		get destaques() {
			return ordensCompra.filter((oc) => oc.id)
		},
	}
}
