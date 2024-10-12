import Producto from '@/types/producto.class';
import axios from 'axios';

export default async function ProductoPut(id: number, dto: Partial<Producto>) {
  return (await axios.put(`/productos/${id}`, dto)).data;
}
