import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// Habilitar CORS para desenvolvimento (localhost) e produção (Vercel)
	app.enableCors({
		origin: [
			"http://localhost:3000", // desenvolvimento local
			"https://drcode-order-manager.vercel.app", // produção na Vercel
		],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true, // necessário se estiver usando cookies ou sessões
	})

	await app.listen(process.env.PORT ?? 4000)
}
bootstrap()
