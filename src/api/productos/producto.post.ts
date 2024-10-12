import Producto from '@/types/producto.class';
import axios from 'axios';

export default async function ProductoPost(dto: Partial<Producto>) {
  return (await axios.post('/productos', dto)).data;
}
