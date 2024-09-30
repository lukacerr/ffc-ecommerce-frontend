import { TipoDeUsuario } from './user.interface';

enum Talle {
  XL = 'XL',
  L = 'L',
  M = 'M',
  S = 'S',
  XS = 'XS',
}

enum TipoDeAbono {
  MENSUAL = 'mensual',
  ANUAL = 'anual',
  SEMESTRAL = 'semestral',
}

export interface Descuento {
  tipoDeUsuario: TipoDeUsuario;
  descuento: number;
}

export default interface Product {
  nombre: string; // Nombre del producto (máximo 150 caracteres)
  id: number; // ID del producto
  descripcion: string; // Descripción del producto
  imagenes: string[]; // URLs de las imágenes (hasta 5)
  precioVenta: number; // Precio de venta
  precioCompra: number; // Precio de compra
  stockActual: number; // Stock actual
  stockMinimo: number; // Stock mínimo
  descuentoEfectivo: number; // Descuento para pago en efectivo (ejemplo: 0.2 para 20%)
  descuentosUsuario: Descuento[]; // Descuentos específicos para diferentes usuarios
  caracteristicas?: string[]; // Lista de características
  tallesDisponibles?: Talle[]; // Para indumentaria: lista de talles
  numeroAsiento?: number; // Para entradas: número de asiento
  sector?: string; // Para entradas: sector del asiento
  tipoDeAbono?: TipoDeAbono; // Para abonos: tipo de abono
}
