import { create } from 'zustand';
import Usuario from '@/types/usuario.interface';
import axios from 'axios';
import { NavigateFunction } from 'react-router';
import LoginPost from '@/api/login.post';

interface IUsuarioStore extends Partial<Usuario> {
  login: (nombreUsuario: string, password: string, navigate?: NavigateFunction) => Promise<Usuario>;
  logout: (navigate?: NavigateFunction) => void;
}

export const useUsuarioStore = create<IUsuarioStore>((set) => ({
  token: undefined,
  ...JSON.parse(localStorage.getItem('usuario_storage') || '{}'),
  login: async (nombreUsuario, password, navigate) => {
    const u = await LoginPost(nombreUsuario, password);
    axios.defaults.headers.common['Authorization'] = `Bearer ${u.token}`;
    localStorage.setItem('usuario_storage', JSON.stringify(u));
    set(u);
    if (navigate) navigate('/');
    return u;
  },
  logout: (navigate) => {
    axios.defaults.headers.common['Authorization'] = undefined;
    localStorage.removeItem('usuario_storage');
    set({ token: undefined });
    if (navigate) navigate('/ingresar');
  },
}));
