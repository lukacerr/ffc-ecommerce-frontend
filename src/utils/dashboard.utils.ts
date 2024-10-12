import Compra from '@/types/compra.interface';
import Venta from '@/types/venta.interface';
import Big from 'big.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export interface Transaction {
  type: 'compra' | 'venta';
  id: number;
  username?: string;
  date: dayjs.Dayjs;
  _numdate: number;
  amount: Big;
  quantity: number;
  ids?: number[];
}

export default class DashboardUtils {
  from = dayjs().subtract(1, 'year');
  to = dayjs();
  minDate = dayjs().subtract(1, 'year');
  maxDate = dayjs();
  data: Transaction[] = [];

  constructor(ventas?: Venta[], compras?: Compra[], filters?: { from: dayjs.Dayjs; to: dayjs.Dayjs }) {
    this.from = filters?.from || this.from;
    this.to = filters?.to || this.to;

    this.data.push(
      ...(compras?.map((v) => ({
        type: 'compra' as const,
        id: v.idCompra,
        username: v.nombreUsuario,
        date: dayjs(v.fechaOrden),
        _numdate: v.fechaOrden.valueOf(),
        amount: Big(v.montoTotal),
        quantity: v.cantidadDeUnidades,
        ids: [v.idProducto],
      })) ?? []),
      ...(ventas?.map((v) => ({
        type: 'venta' as const,
        id: v.idVenta,
        username: v.nombreUsuario,
        date: dayjs(v.fecha),
        _numdate: v.fecha.valueOf(),
        amount: Big(v.montoTotal),
        quantity: v.cantidadDeProductos,
        ids: v.productos,
      })) ?? [])
    );

    const sorted = this.data.sort((a, b) => a._numdate - b._numdate);
    this.minDate = sorted[0]?.date || this.from;
    this.maxDate = sorted[sorted.length - 1]?.date || this.to;
    this.data = sorted.filter((v) => v.date.isBetween(this.from, this.to));
  }

  static BigToNumberArray(arr: Big[]) {
    return arr.map((v) => v.toNumber());
  }

  get hasData() {
    return this.data.length;
  }

  get uniqueDates() {
    return [...new Set(this.data.map((v) => v._numdate))];
  }

  get uniqueBuyers() {
    return [
      ...new Set(
        this.data
          .filter((v) => v.type === 'venta')
          .sort((a, b) => b.amount.minus(a.amount).toNumber())
          .map((v) => v.username)
      ),
    ];
  }

  dataOf(type: 'compra' | 'venta') {
    return this.data.filter((v) => v.type === type);
  }

  id(idv: number | string) {
    return this.data.find((v) => v.id === Number(idv));
  }

  dataXdateReducer<T>(
    type: 'compra' | 'venta' | 'full',
    fn: (previousValue: T, currentValue: Transaction, currentIndex: number, array: Transaction[]) => T,
    init: T
  ) {
    return this.uniqueDates.map((d) =>
      this.data.filter((v) => v._numdate === d && (type === 'full' || v.type === type)).reduce<T>(fn, init)
    );
  }

  dataXweekReducer<T>(
    type: 'compra' | 'venta' | 'full',
    fn: (previousValue: T, currentValue: Transaction, currentIndex: number, array: Transaction[]) => T,
    init: T
  ) {
    return [0, 1, 2, 3, 4, 5, 6].map((d) =>
      this.data.filter((v) => v.date.day() === d && (type === 'full' || v.type === type)).reduce<T>(fn, init)
    );
  }

  dataXuserReducer<T>(
    type: 'compra' | 'venta' | 'full',
    fn: (previousValue: T, currentValue: Transaction, currentIndex: number, array: Transaction[]) => T,
    init: T
  ) {
    return this.uniqueBuyers.map((u) =>
      this.data.filter((v) => v.username === u && (type === 'full' || v.type === type)).reduce<T>(fn, init)
    );
  }

  dataReducer<T>(
    type: 'compra' | 'venta' | 'full',
    fn: (previousValue: T, currentValue: Transaction, currentIndex: number, array: Transaction[]) => T,
    init: T
  ) {
    return this.data.filter((v) => type === 'full' || v.type === type).reduce<T>(fn, init);
  }
}
