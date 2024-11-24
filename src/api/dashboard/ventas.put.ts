import Venta from '@/types/venta.interface';
import axios from 'axios';

export default async function VentaPut(idVenta: number, dto: Partial<Venta>) {
  return (await axios.put(`/ventas`, { idVenta, ...dto })).data;
}
