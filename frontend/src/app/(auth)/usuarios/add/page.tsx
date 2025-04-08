// src/app/produtos/novo/page.tsx
"use client"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import UsuarioForm from "@/components/usuarios/form-usuario"

export default function NovoUsuarioPage() {
    return (
        <Container className="flex-col">
            <HeaderPage titulo="Cadastrar Novo Usuário" textoBtn="Voltar para Lista" linkBtn="/usuarios" />
            <UsuarioForm />
        </Container>
    )
}
