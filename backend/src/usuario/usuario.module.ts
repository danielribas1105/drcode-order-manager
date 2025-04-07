import { Module } from "@nestjs/common"
import { UsuarioController } from "./usuario.controller"
import { UsuarioPrisma } from "./usuario.prisma"
import { DbModule } from "src/db/db.module"

@Module({
	imports: [DbModule],
	controllers: [UsuarioController],
	providers: [UsuarioPrisma],
})
export class UsuarioModule {}
