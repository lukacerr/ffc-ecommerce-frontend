import Proveedor from '@/types/proveedor.interface';
import axios from 'axios';

export default async function ProveedorGet(id: number | string) {
  return (await axios.get<Proveedor>(`/proveedores/${id}`)).data;
}
