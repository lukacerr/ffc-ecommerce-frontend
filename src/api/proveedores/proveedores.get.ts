import Proveedor from '@/types/proveedor.interface';
import axios from 'axios';

export default async function ProveedoresGet() {
  return (await axios.get<Proveedor[]>('/proveedores')).data;
}
