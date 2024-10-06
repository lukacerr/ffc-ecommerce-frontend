import Proveedor from '@/types/proveedor.interface';

export default async function ProveedorPost(dto: Partial<Proveedor>) {
  // FIXME: return (await axios.post('/productos', dto)).data;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { msj: 'OK', dto };
}
