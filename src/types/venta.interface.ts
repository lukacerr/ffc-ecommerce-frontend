export enum EstadoVenta {
  PAGADO = "PAGADO",
  EN_PROCESO = "EN_PROCESO",
  ENVIADO = "ENVIADO",
  RECIBIDO = "RECIBIDO",
}

export default interface Venta {
  idVenta: number;
  nombreUsuario: string;
  fecha: Date;
  montoTotal: number;
  cantidadDeProductos: number;
  productos: number[];
  estado: EstadoVenta;
}
