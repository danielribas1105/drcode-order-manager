import { Module } from "@nestjs/common"
import { SupermercadoController } from "./supermercado.controller"
import { SupermercadoPrisma } from "./supermercado.prisma"
import { DbModule } from "src/db/db.module"

@Module({
	controllers: [SupermercadoController],
	providers: [SupermercadoPrisma],
	imports: [DbModule],
})
export class SupermercadoModule {}
