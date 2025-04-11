import { z } from 'zod'

export const SignupFormSchema = z.object({
   /* nome: z
      .string()
      .min(3, { message: 'O nome deve possuir mais do que 3 caracteres' })
      .trim(), */
   email: z.string().email({ message: 'Por favor, insira um e-mail válido' }).trim(),
   senha: z
      .string()
      .min(8, { message: 'Ter pelo menos 8 caracteres.' })
      .regex(/[a-zA-Z]/, { message: 'Conter pelo menos uma letra.' })
      .regex(/[0-9]/, { message: 'Conter pelo menos um número.' })
      .regex(/[^a-zA-Z0-9]/, {
         message: 'Conter pelo menos um caracter especial.',
      })
      .trim(),
})

export type FormState =
   | {
      errors?: {
         //nome?: string[]
         email?: string[]
         senha?: string[]
      }
      message?: string
   }
   | undefined