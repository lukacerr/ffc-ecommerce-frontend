export enum EstadoVenta {
  PAGADO = 'PAGADO',
  EN_PROCESO = 'EN_PROCESO',
  ENVIADO = 'ENVIADO',
  RECIBIDO = 'RECIBIDO',
}

export const allStatuses = {
  [EstadoVenta.PAGADO]: { value: 'Pagado', color: 'info', successor: EstadoVenta.EN_PROCESO },
  [EstadoVenta.EN_PROCESO]: { value: 'En proceso', color: 'default', successor: EstadoVenta.ENVIADO },
  [EstadoVenta.ENVIADO]: { value: 'Enviado', color: 'warning', successor: EstadoVenta.RECIBIDO },
  [EstadoVenta.RECIBIDO]: { value: 'Recibido', color: 'success', successor: EstadoVenta.PAGADO },
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
