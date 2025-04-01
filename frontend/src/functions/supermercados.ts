import { Supermercado } from "@core"
import { httpGet } from "./api"

export async function obterSupermercados() {
	const supermercados: Supermercado[] = await httpGet("/supermercados")

	return {
		allSupermercados: supermercados,
		get destaques() {
			return supermercados.filter((supermercado) => supermercado.razaoSocial)
		},
	}
}
