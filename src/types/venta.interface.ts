export default interface Venta {
  idVenta: number;
  nombreUsuario: string;
  fecha: Date;
  montoTotal: number;
  cantidadDeProductos: number;
  productos: number[];
}
