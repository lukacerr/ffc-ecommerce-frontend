export enum EstadoVenta {
  PAGADO = 'PAGADO',
  ENVIADO = 'ENVIADO',
  ENTREGADO = 'ENTREGADO',
  ERROR_DE_STOCK = 'ERROR_DE_STOCK',
}

export const allStatuses = {
  [EstadoVenta.PAGADO]: { value: 'Pagado', color: 'warning', successor: EstadoVenta.ENVIADO },
  [EstadoVenta.ENVIADO]: { value: 'Enviado', color: 'info', successor: EstadoVenta.ENTREGADO },
  [EstadoVenta.ENTREGADO]: { value: 'Entregado', color: 'success', successor: EstadoVenta.ERROR_DE_STOCK },
  [EstadoVenta.ERROR_DE_STOCK]: { value: 'Error de stock', color: 'error', successor: EstadoVenta.PAGADO },
};

export default interface Venta {
  idVenta: number;
  nombreUsuario: string;
  fecha: Date;
  montoTotal: number;
  cantidadDeProductos: number;
  productos: number[];
  estado: EstadoVenta;
}
