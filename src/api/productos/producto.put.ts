import Producto from '@/types/producto.class';

export default async function ProductoPut(id: number, dto: Partial<Producto>) {
  // FIXME: return (await axios.put(`/productos/${id}`, dto)).data;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { msj: 'OK', id, dto };
}
