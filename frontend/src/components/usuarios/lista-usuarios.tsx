import Link from "next/link"
import { Usuario } from "@core"

export interface ListaUsuariosProps {
	usuarios: Usuario[]
	onExcluir?: (id: string) => void
}

export default function Listausuarios({ usuarios, onExcluir }: ListaUsuariosProps) {
	return (
		<div className="w-full overflow-x-auto">
			<table className="min-w-full bg-white rounded-lg overflow-hidden">
				<thead className="bg-gray-100">
					<tr>
						<th className="text-left py-3 px-4 font-semibold text-sm">Nome</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">E-mail</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">CPF</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Perfil</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
						<th className="text-left py-3 px-4 font-semibold text-sm">Ações</th>
					</tr>
				</thead>
				<tbody>
					{usuarios.length > 0 ? (
						usuarios.map((usuario) => (
							<tr key={usuario.id} className="border-b hover:bg-gray-50">
								<td className="py-3 px-4">{usuario.nome}</td>
								<td className="py-3 px-4">{usuario.email}</td>
								<td className="py-3 px-4">{usuario.cpf}</td>
								<td className="py-3 px-4">{usuario.perfil}</td>
								<td className="py-3 px-4">{usuario.status}</td>
								<td className="py-3 px-4 flex gap-2">
									<Link
										href={`/usuarios/${usuario.id}`}
										className="text-blue-600 hover:text-blue-800"
									>
										Ver
									</Link>
									<Link
										href={`/usuarios/edit/${usuario.id}`}
										className="text-green-600 hover:text-green-800"
									>
										Editar
									</Link>
									{onExcluir && (
										<button
											onClick={() => onExcluir(usuario.id)}
											className="text-red-600 hover:text-red-800"
										>
											Excluir
										</button>
									)}
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={6} className="py-4 px-4 text-center text-gray-500">
								Nenhum usuário encontrado
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
