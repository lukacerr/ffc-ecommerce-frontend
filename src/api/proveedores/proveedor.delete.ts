import axios from 'axios';

export default async function ProveedorDelete(id: number) {
  return (await axios.delete(`/proveedores/${id}`)).data;
}
