import { Usuario } from "@/core/usuario"

const usuarios: Usuario[] = [
   {
      id: 'f5ed9bca-b60f-4f3d-a001-5b2da372d05f',
      nome: "Bianca",
      email: "bianca@gmail.com",
      cpf: "123456789-00",
      imagemURL: "/images/img-user.png",
      senha: "bianca@01",
      perfil: "Admin",
      status: "Ativo"
   },
   {
      id: '236453da-0ce2-4ab9-8e87-d14eac902ad0',
      nome: "Leonardo",
      email: "leonardo@gmail.com",
      cpf: "123456789-00",
      imagemURL: "/images/img-user.png",
      senha: "leonardo@01",
      perfil: "Admin",
      status: "Ativo"
   },
   {
      id: 'bf5e567f-99bd-4ccc-89c5-119ef28a433b',
      nome: "Isaac Silva",
      email: "isaac@gmail.com",
      cpf: "123456789-00",
      imagemURL: "/images/img-user.png",
      senha: "isaac@01",
      perfil: "Comprador",
      status: "Ativo"
   },
   {
      id: 'a08d1f59-eca7-476a-98f2-76e8737d2114',
      nome: "Adenilson Lopes Marcolino",
      email: "adenilson@gmail.com",
      cpf: "123456789-00",
      imagemURL: "/images/img-user.png",
      senha: "adenilson@01",
      perfil: "Comprador",
      status: "Bloqueado"
   }
]

export default usuarios