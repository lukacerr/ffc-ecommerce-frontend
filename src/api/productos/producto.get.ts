import Producto from '@/types/producto.class';
import axios from 'axios';

export default async function ProductoGet(id: number | string) {
  return new Producto((await axios.get<Producto>(`/productos/${id}`)).data);
}
