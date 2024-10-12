import Compra from '@/types/compra.interface';
import axios from 'axios';

export default async function ComprasGet() {
  return (await axios.get<Compra[]>('/compras')).data.map((v) => ({ ...v, fechaOrden: new Date(v.fechaOrden) }));
}
