"use client"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import OrdemCompraForm from "@/components/ordensCompra/ordemCompraForm"

export default function NovaOrdemCompraPage() {
    return (
        <Container className="flex-col">
            <HeaderPage titulo="Cadastrar Nova OC" textoBtn="Voltar para Lista" linkBtn="/ordens_compra" />
            <OrdemCompraForm />
        </Container>
    )
}
