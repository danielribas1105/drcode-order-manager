// src/app/produtos/editar/[id]/page.tsx
"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Usuario } from "@core"
import { usuarioService } from "@/services/usuariosService"
import Container from "@/components/layout/container"
import HeaderPage from "@/components/templates/header-page"
import UsuarioForm from "@/components/usuarios/form-usuario"

export default function EditarUsuarioPage() {
    const params = useParams()
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const id = Array.isArray(params.id) ? params.id[0] : params.id

    useEffect(() => {
        async function carregarUsuario(id: string) {
            try {
                const data = await usuarioService.obterPorId(id)
                setUsuario(data)
            } catch (error) {
                console.error("Erro ao carregar usuário:", error)
                setError("Não foi possível carregar os dados do usuário.")
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            carregarUsuario(id)
        }
    }, [id])

    if (loading) return <Container>Carregando...</Container>
    if (error)
        return (
            <Container>
                <div className="text-red-600">{error}</div>
            </Container>
        )
    if (!usuario)
        return (
            <Container>
                <div>Usuário não encontrado</div>
            </Container>
        )

    return (
        <Container className="flex-col">
            <HeaderPage
                titulo={`Editar Usuário: ${usuario.nome}`}
                textoBtn="Voltar para Lista"
                linkBtn="/produtos"
            />
            <UsuarioForm usuario={usuario} isEditing={true} />
        </Container>
    )
}
