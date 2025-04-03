import Image from "next/image"
import Link from "next/link"
import Avatar from "@/components/ui/avatar"
import Container from "../layout/container"
import logo from "@/../public/images/logo/logo-order-manager-370-95.png"

export default function Header() {
	return (
		<header className="flex items-center p-1">
			<Container className="flex flex-1 justify-between items-center">
				<Link href={"/home"} className="flex gap-3 items-center">
					<Image src={logo} alt={"Logo Order Manager"} width={200} height={200} />
				</Link>
				<div className="flex items-center gap-4">
					<Avatar />
				</div>
			</Container>
		</header>
	)
}
