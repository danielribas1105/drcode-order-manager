import { Module } from "@nestjs/common"
import { OrdemCompraController } from "./ordem-compra.controller"
import { OrdemCompraPrisma } from "./ordem-compra.prisma"
import { DbModule } from "src/db/db.module"

@Module({
	imports: [DbModule],
	controllers: [OrdemCompraController],
	providers: [OrdemCompraPrisma],
})
export class OrdemCompraModule {}
