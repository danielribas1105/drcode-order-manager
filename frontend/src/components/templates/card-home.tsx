import React, { ElementType } from "react"
import Link from "next/link"

export interface CardProps {
	className?: string
	link: string
	titulo: string
	descricao: string
	icon: ElementType
}

export default function CardHome(props: CardProps) {
	return (
		<Link href={props.link}>
			<div className="flex flex-col gap-4 w-72 h-48 p-3 border-2 border-logo-black rounded-md hover:shadow-2xl hover:shadow-logo-black/50">
				<div className="flex justify-between items-center">
					<div className="text-lg text-logo-black font-logo font-semibold">{props.titulo}</div>
					<props.icon size={40} color="#f88a1a" />
				</div>
				<div className="text-sm">{props.descricao}</div>
			</div>
		</Link>
	)
}
