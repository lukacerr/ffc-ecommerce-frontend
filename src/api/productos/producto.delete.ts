import axios from 'axios';

export default async function ProductoDelete(id: number) {
  return (await axios.delete(`/productos/${id}`)).data;
}
