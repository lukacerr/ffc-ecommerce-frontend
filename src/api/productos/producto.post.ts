import Producto from '@/types/producto.class';

export default async function ProductoPost(dto: Partial<Producto>) {
  // FIXME: return (await axios.post('/productos', dto)).data;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { msj: 'OK', dto };
}
