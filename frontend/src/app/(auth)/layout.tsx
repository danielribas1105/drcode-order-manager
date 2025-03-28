import Footer from "@/components/shared/footer"
import Header from "@/components/shared/header"

export default function Layout(props: { children: React.ReactNode }) {
	return (
		<div>
			<Header />
			{props.children}
			<Footer />
		</div>
	)
}
