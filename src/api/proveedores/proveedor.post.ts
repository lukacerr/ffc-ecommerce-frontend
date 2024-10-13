import Proveedor from '@/types/proveedor.interface';
import axios from 'axios';

export default async function ProveedorPost(dto: Partial<Proveedor>) {
  return (await axios.post('/proveedores', dto)).data;
}
