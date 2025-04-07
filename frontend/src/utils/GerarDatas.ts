export default class GerarDatas {
	static dataHoraMinuto(): string {
		// Obtendo a data atual
		const currentDate = new Date()

		// Exibindo a data completa
		console.log("Data completa:", currentDate)

		// Formatando a data (DD/MM/YYYY)
		const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")}/${(
			currentDate.getMonth() + 1
		)
			.toString()
			.padStart(2, "0")}/${currentDate.getFullYear()}`
		console.log("Data formatada:", formattedDate)

		// Formatando com hora (DD/MM/YYYY HH:mm:ss)
		const formattedDateTime = `${formattedDate} ${currentDate
			.getHours()
			.toString()
			.padStart(2, "0")}:${currentDate.getMinutes().toString().padStart(2, "0")}:${currentDate
			.getSeconds()
			.toString()
			.padStart(2, "0")}`
		//console.log("Data e hora formatadas:", formattedDateTime);
		return formattedDateTime
	}

	static ordenarData(data: string): string {
		console.log("data " + data)
		const arrayData = data.split("/")
		const dataFormated = `${arrayData[1]}/${arrayData[0]}/${arrayData[2]}`
		return dataFormated
	}
}
