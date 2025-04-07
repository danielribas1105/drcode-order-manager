import { Module } from "@nestjs/common"
import { SupermercadoController } from "./supermercado.controller"
import { SupermercadoPrisma } from "./supermercado.prisma"
import { DbModule } from "src/db/db.module"

@Module({
	imports: [DbModule],
	controllers: [SupermercadoController],
	providers: [SupermercadoPrisma],
})
export class SupermercadoModule {}
