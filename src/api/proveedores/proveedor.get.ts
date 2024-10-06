import Proveedor from '@/types/proveedor.interface';

export default async function ProveedorGet(id: number | string): Promise<Proveedor> {
  // FIXME: return (await axios.get<Proveedor>(`/proveedores/${id}`)).data;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    idProveedor: Number(id),
    nombre: 'Nombre',
    CUIT: '20445993205',
  };
}
