import { Module } from "@nestjs/common"
import { OrdemCompraController } from "./ordem-compra.controller"
import { OrdemCompraPrisma } from "./ordem-compra.prisma"
import { DbModule } from "src/db/db.module"

@Module({
	controllers: [OrdemCompraController],
	providers: [OrdemCompraPrisma],
	imports: [DbModule],
})
export class OrdemCompraModule {}
