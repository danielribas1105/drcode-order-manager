import { SignupFormSchema, FormState } from "@/libs/definitions"
import { usuarioService } from "@/services/usuariosService"

export async function signup(state: FormState, formData: FormData) {
	const listaUsuarios = await usuarioService.obterTodos()

	// Validate form fields
	const validatedFields = SignupFormSchema.safeParse({
		//nome: formData.get('nome'),
		email: formData.get("email"),
		senha: formData.get("senha"),
	})

	// If any form fields are invalid, return early
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	const { email, senha } = validatedFields.data

	let usuarioId: any = null
	listaUsuarios.forEach((usuario) => {
		if (usuario.email === email && usuario.senha === senha) {
			usuarioId = usuario.id
			console.log(`Usuário oK, ID: ${usuarioId}`)
		}
	})
	// e.g. Hash the user's password before storing it
	//const hashedPassword = await bcrypt.hash(senha, 10)

	// 3. Insert the user into the database or call an Auth Library's API
	/* const data = await db
      .insert(users)
      .values({
         name,
         email,
         password: hashedPassword,
      })
      .returning({ id: users.id }) */

	//const user = data[0]

	if (!usuarioId) {
		alert("Usuário não encontrado!")
		return {
			message: "An error occurred while creating your account.",
		}
	} else {
		const usuario = listaUsuarios.find((u) => u.id === usuarioId)
		localStorage.setItem("usuario", JSON.stringify(usuario))
		window.location.href = "/home"
	}
	// Call the provider or db to create a user...
}
