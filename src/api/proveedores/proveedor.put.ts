import Proveedor from '@/types/proveedor.interface';

export default async function ProveedorPut(id: number, dto: Partial<Proveedor>) {
  // FIXME: return (await axios.put(`/proveedor/${id}`, dto)).data;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { msj: 'OK', id, dto };
}
