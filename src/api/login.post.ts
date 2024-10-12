import Usuario from '@/types/usuario.interface';
import axios from 'axios';

export default async function LoginPost(nombreUsuario: string, password: string) {
  return {
    nombreUsuario,
    ...(await axios.post<Partial<Usuario>>('/login', { nombreUsuario, password })).data,
  };
}
