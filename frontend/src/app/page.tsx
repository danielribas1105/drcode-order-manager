import Image from "next/image"
import logo from "@/../public/images/logo/logo-order-manager-400-200.png"
import SignupForm from "@/components/ui/signup-form"
import Link from "next/link"

export default function Login() {
	return (
		<div className="flex flex-col gap-1 items-center py-10 h-screen">
			<Image src={logo} alt={"Logo Order Manager"} width={300} height={300} />
			<SignupForm />
		</div>
	)
}
