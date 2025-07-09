import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const fontText = Montserrat({
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Order Manager",
	description: "Gerenciador de ordens de compra",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body className={fontText.className}>{children}</body>
		</html>
	)
}
