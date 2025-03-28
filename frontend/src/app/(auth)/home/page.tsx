"use client"
import { useEffect, useState } from "react"
import {
	IconBuildingStore,
	IconClipboardText,
	IconEdit,
	IconFileAnalytics,
	IconShoppingCart,
	IconUsers,
} from "@tabler/icons-react"
import CardHome from "@/components/templates/card-home"
import Container from "@/components/shared/container"

export default function Home() {
	//const [usuarioAtual, setUsuarioAtual] = useState<Partial<Usuario> | null>(null)

	/* useEffect(() => {
      if (typeof window !== "undefined") {
         const usuarioSalvo = localStorage.getItem("usuario");
         if (usuarioSalvo) {
            setUsuarioAtual(JSON.parse(usuarioSalvo)); 
         }
      }
   }, []); */

	return (
		<Container className="flex flex-col items-center md:items-start gap-5 md:basis-3/4">
			<h1 className="font-logo font-bold text-xl text-logo-black">Bem-vindo!</h1>
			<div className="flex flex-col md:flex-row md:flex-wrap gap-6">
				<CardHome
					link={"/ordensCompra"}
					titulo={"ORDENS DE COMPRA"}
					descricao={"Cadastrar e gerenciar as ordens de compras."}
					icon={IconEdit}
				/>
				<CardHome
					link={"/pedidos"}
					titulo={"PEDIDOS"}
					descricao={"Acompanhar os pedidos realizados"}
					icon={IconClipboardText}
				/>
				<CardHome
					link={"/relatorios"}
					titulo={"RELATÓRIOS"}
					descricao={"Módulo de relatórios"}
					icon={IconFileAnalytics}
				/>
				<CardHome
					link={"/produtos"}
					titulo={"PRODUTOS"}
					descricao={"Cadastrar, editar ou excluir produtos."}
					icon={IconShoppingCart}
				/>
				<CardHome
					link={"/usuarios"}
					titulo={"USUÁRIOS"}
					descricao={"Cadastro de usuários."}
					icon={IconUsers}
				/>
				<CardHome
					link={"/supermercado"}
					titulo={"SUPERMERCADOS"}
					descricao={"Supermercados cadastrados"}
					icon={IconBuildingStore}
				/>
			</div>
		</Container>
	)
}
