"use client"
import React from "react"
import Image from "next/image"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import logo from "@/../public/logo-order-manager-370-95.png"

export function SignupForm() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log("Form submitted")
		alert("Form submitted")
	}
	return (
		<div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
			<Image src={logo} alt="Logo Order Manager" width={500} height={0} />
			<form className="my-8" onSubmit={handleSubmit}>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="email">E-mail</Label>
					<Input id="email" placeholder="seuemail@provedor.com" type="email" />
				</LabelInputContainer>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="password">Senha</Label>
					<Input id="password" placeholder="••••••••" type="password" />
				</LabelInputContainer>
				<button
					className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
					type="submit"
				>
					Entrar &rarr;
					<BottomGradient />
				</button>

				<div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
			</form>
		</div>
	)
}

const BottomGradient = () => {
	return (
		<>
			<span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
			<span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
		</>
	)
}

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
}
