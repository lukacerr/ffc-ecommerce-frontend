import Producto from '@/types/producto.class';
import axios from 'axios';

export default async function ProductosGet() {
  return (await axios.get<Producto[]>('/productos')).data.map((v) => new Producto(v));
}
