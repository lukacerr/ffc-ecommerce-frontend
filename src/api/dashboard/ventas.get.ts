import Venta from '@/types/venta.interface';
import axios from 'axios';

export default async function VentasGet() {
  return (await axios.get<Venta[]>('/ventas')).data.map((v) => ({
    ...v,
    productos: [...new Set(v.productos)],
    fecha: new Date(v.fecha),
  }));
}
