import type { Metadata } from "next"
import { Montserrat, Tomorrow } from "next/font/google"
import "./globals.css"

const fontLogo = Tomorrow({
	weight: "500",
	style: "italic",
	subsets: ["latin"],
})

const fontText = Montserrat({
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Order Manager",
	description: "Gerenciador de pedidos e ordens de compra",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${fontText.className} antialiased`}>{children}</body>
		</html>
	)
}
