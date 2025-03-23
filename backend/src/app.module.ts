import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { DbModule } from "./db/db.module"
import { ProdutoModule } from "./produto/produto.module"
import { UsuarioModule } from "./usuario/usuario.module"
import { OrdemCompraModule } from "./ordemCompra/ordem-compra.module"
import { PedidoModule } from "./pedido/pedido.module"
import { SupermercadoModule } from "./supermercado/supermercado.module"

@Module({
	imports: [DbModule, OrdemCompraModule, PedidoModule, ProdutoModule, SupermercadoModule, UsuarioModule],
	controllers: [AppController],
})
export class AppModule {}
