export default async function LoginPost(nombreUsuario: string, password: string) {
  // FIXME: return (await axios.post<Usuario>('/login', { nombreUsuario, password })).data;
  return { token: 'ejemplo-jwt', nombreUsuario, password };
}
