import { create } from 'zustand';
import User from '@/interfaces/user.interface';
import axios from 'axios';
import { NavigateFunction } from 'react-router';
import LoginPost from '@/api/login.post';

interface IUserStore extends Partial<User> {
  login: (email: string, password: string, navigate?: NavigateFunction) => Promise<User>;
  logout: (navigate?: NavigateFunction) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  token: undefined,
  ...JSON.parse(localStorage.getItem('user_storage') || '{}'),
  login: async (email, password, navigate) => {
    const u = await LoginPost(email, password);
    axios.defaults.headers.common['Authorization'] = `Bearer ${u.token}`;
    localStorage.setItem('user_storage', JSON.stringify(u));
    set(u);
    if (navigate) navigate('/');
    return u;
  },
  logout: (navigate) => {
    axios.defaults.headers.common['Authorization'] = undefined;
    localStorage.removeItem('user_storage');
    set({ token: undefined });
    if (navigate) navigate('/ingresar');
  },
}));
