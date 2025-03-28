import logo from "@/../public/logo-order-manager-370-95.png"
import Avatar from "@/components/shared/avatar"
import Image from "next/image"
import Link from "next/link"
import Container from "./container"

export default function Header() {
	return (
		<header className="flex items-center py-1">
			<Container className="flex flex-1 items-center justify-between">
				<Link href={"/home"}>
					<Image src={logo} alt={"Logo Order Manager"} width={200} height={0} />
				</Link>
				<Avatar />
			</Container>
		</header>
	)
}
