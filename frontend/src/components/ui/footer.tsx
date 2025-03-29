import { IconCode, IconHeart, IconMug } from "@tabler/icons-react"

export default function Footer() {
   return (
      <div className="container-box flex-col">
         <div className="flex gap-2 items-center justify-center md:justify-start">
            <p>Desenvolvido com</p>
            <IconHeart size={20} color="#ff0000" />
            <p>e</p>
            <IconMug size={22} color="#b5842a" />
            <p>por</p>
            <IconCode size={22} color="#5e17eb" />
            <p>DRCode</p>
         </div>
         <p>@2025 - Todos os direitos reservados</p>
      </div>
   )
}