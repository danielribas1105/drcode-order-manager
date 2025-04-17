import Link from "next/link"
import { ReactNode } from "react"
import { IconHome, IconPlus } from "@tabler/icons-react"

interface HeaderPageProps {
	titulo: string
	textoBtn?: string
	linkBtn: string
	textofiltro?: string
	children?: ReactNode
}

export default function HeaderPage({ titulo, textoBtn, linkBtn, textofiltro, children }: HeaderPageProps) {
	return (
		<div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4 my-6">
			<h1 className="text-2xl font-bold">{titulo}</h1>
			<div className="flex items-center gap-4">
				{textofiltro && (
					<div className="relative">
						<input
							type="text"
							placeholder={textofiltro}
							className="pl-10 pr-4 py-2 border rounded-lg w-64"
						/>
						<svg
							className="w-5 h-5 text-gray-500 absolute left-3 top-2.5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</div>
				)}
				{textoBtn && (
					<Link
						href={linkBtn}
						className="flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
					>
						<IconPlus />
						{textoBtn}
					</Link>
				)}
				<Link
					href="/home"
					className="flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
				>
					<IconHome />
					Home
				</Link>
				{children}
			</div>
		</div>
	)
}
