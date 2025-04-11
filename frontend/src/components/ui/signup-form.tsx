"use client"
import { useActionState } from "react"
import { signup } from "@/functions/auth"
import Footer from "./footer"

export default function SignupForm() {
	const [state, action, pending] = useActionState(signup, undefined)

	return (
		<form action={action}>
			<div className="flex flex-col gap-3">
				<input
					id="nome"
					name="nome"
					placeholder="Nome"
					className="py-1 px-3 border-2 border-zinc-400 rounded-md text-lg hidden"
				/>
				{/* {state?.errors?.nome && <p>{state.errors.nome}</p>} */}

				<input
					id="email"
					name="email"
					type="email"
					placeholder="Email"
					className="py-1 px-3 border-2 border-zinc-400 rounded-md text-lg"
				/>
				{state?.errors?.email && <p>{state.errors.email}</p>}

				<input
					id="senha"
					name="senha"
					type="senha"
					placeholder="Senha"
					className="py-1 px-3 border-2 border-zinc-400 rounded-md text-lg"
				/>

				{state?.errors?.senha && (
					<div>
						<p>Regras para a senha:</p>
						<ul>
							{state.errors.senha.map((error) => (
								<li key={error}>- {error}</li>
							))}
						</ul>
					</div>
				)}

				<button
					type="submit"
					className="bg-logo-blue-dark px-10 py-2 text-white rounded-md hover:bg-logo-blue"
				>
					Entrar
				</button>
			</div>
		</form>
	)
}
