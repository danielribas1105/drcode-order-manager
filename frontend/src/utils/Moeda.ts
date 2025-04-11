export default class Moeda {
	static formatar(valor: number, localizacao: string = "pt-BR", moeda: string = "BRL"): string {
		return (valor ?? 0).toLocaleString(localizacao, {
			style: "currency",
			currency: moeda,
		})
	}

	static formatarMoeda(valor: number) {
		return valor.toLocaleString("pt-BR", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})
	}

	static parseMoeda(valor: string) {
		// Remove caracteres não numéricos, exceto vírgula
		const novoValor = valor.replace(/[^\d,]/g, "")
		// Converte vírgula para ponto (formato JS)
		return parseFloat(valor.replace(",", ".")) || 0
	}
}
