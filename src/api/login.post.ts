/*
import axios from 'axios';
import User from '@/interfaces/user.interface';

// FIXME:
export default async function LoginPost(email: string, password: string) {
  // return (await axios.post<User>('/login', { email, password })).data;
}
*/
export default async function LoginPost(email: string, password: string) {
  return { token: 'ejemplo-jwt', email, password };
}
