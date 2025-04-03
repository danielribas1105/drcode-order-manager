import Aside from "@/components/layout/aside"
import Container from "@/components/layout/container"

export default function HomeLayout({ children }: any) {
	return (
		<Container className="flex flex-col md:flex-row mt-4">
			{children}
			<Aside />
		</Container>
	)
}
