import Producto, { Categoria, Talle } from '@/types/producto.class';

export default async function ProductoGet(id: number | string) {
  // FIXME: return (await axios.get(`/productos/${id}`)).data;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return new Producto({
    idProducto: Number(id),
    idProveedor: 101,
    nombre: 'Camiseta básica',
    descripcion: 'Camiseta de algodón 100%',
    precioVenta: 25.5,
    precioCompra: 15.0,
    stockActual: 30,
    stockMinimo: 5,
    descuentoEfectivo: 0.1,
    descuentoSocios: 0.2,
    descuentoNoSocios: 0.1,
    categoria: Categoria.CAMISETA,
    talles: [Talle.M, Talle.L],
    caracteristicas: ['Color azul', 'Manga corta'],
  });
}
