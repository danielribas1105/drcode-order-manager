import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// Habilitar CORS - Importante!
	app.enableCors({
		origin: ["http://localhost:3000"], // Adicione aqui a porta onde seu Next.js está rodando
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
	})

	await app.listen(process.env.PORT ?? 4000)
}
bootstrap()
