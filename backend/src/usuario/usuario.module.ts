import { Module } from "@nestjs/common"
import { UsuarioController } from "./usuario.controller"
import { UsuarioPrisma } from "./usuario.prisma"
import { DbModule } from "src/db/db.module"

@Module({
	controllers: [UsuarioController],
	providers: [UsuarioPrisma],
	imports: [DbModule],
})
export class UsuarioModule {}
