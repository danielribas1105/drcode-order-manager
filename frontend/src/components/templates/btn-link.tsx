import Link from "next/link"
import { ElementType } from "react"

export interface BotaoLinkProps {
   link: string
   texto: string
   icon: ElementType
}

export default function BotaoLink(props: BotaoLinkProps) {
   return (
      <Link href={props.link} className="btn-default">
         <props.icon size={24} />
         <span>{props.texto}</span>
      </Link>
   )
}