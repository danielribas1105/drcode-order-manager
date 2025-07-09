import Footer from "@/components/ui/footer"
import Header from "@/components/ui/header"
import React from "react"

export default function PagesLayout({ children }: any) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
