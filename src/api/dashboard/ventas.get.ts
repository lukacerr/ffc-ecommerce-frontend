import Venta from '@/types/venta.interface';
import axios from 'axios';

export default async function VentasGet() {
  return (await axios.get<Venta[]>('/ventas')).data.map((v) => ({ ...v, fecha: new Date(v.fecha) }));
}
