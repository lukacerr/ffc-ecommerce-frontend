import Proveedor from '@/types/proveedor.interface';
import axios from 'axios';

export default async function ProveedorPut(id: number, dto: Partial<Proveedor>) {
  return (await axios.put(`/proveedor/${id}`, dto)).data;
}
