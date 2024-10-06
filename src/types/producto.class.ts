export enum Categoria {
  CAMISETA = 'CAMISETA',
  CALZADO = 'CALZADO',
  CAMPERA = 'CAMPERA',
  BUZO = 'BUZO',
}

export const allCategories: { label: string; value: Categoria }[] = [
  { value: Categoria.CAMISETA, label: 'Camiseta' },
  { value: Categoria.CALZADO, label: 'Calzado' },
  { value: Categoria.CAMPERA, label: 'Campera' },
  { value: Categoria.BUZO, label: 'Buzo' },
];

export const getCategoryLabel = (v: Categoria) => allCategories.find((c) => c.value === v)?.label || undefined;

export enum Talle {
  XXL = 'XXL',
  XL = 'XL',
  L = 'L',
  M = 'M',
  S = 'S',
  XS = 'XS',
  XXS = 'XXS',
}

export const allSizes: { label: string; value: Talle }[] = [
  { value: Talle.XXL, label: 'XXL' },
  { value: Talle.XL, label: 'XL' },
  { value: Talle.L, label: 'L' },
  { value: Talle.M, label: 'M' },
  { value: Talle.S, label: 'S' },
  { value: Talle.XS, label: 'XS' },
  { value: Talle.XXS, label: 'XXS' },
];

export default class Producto {
  idProducto: number;
  idProveedor: number;
  nombre: string;
  descripcion: string;
  precioVenta: number;
  precioCompra: number;
  stockActual: number;
  stockMinimo: number;
  descuentoEfectivo: number;
  descuentoSocios: number;
  descuentoNoSocios: number;
  categoria: Categoria;
  talles: Talle[];
  caracteristicas: string[];

  constructor(v: Partial<Producto> = {}) {
    this.idProducto = v.idProducto ?? 0;
    this.idProveedor = v.idProveedor ?? 0;
    this.nombre = v.nombre ?? '';
    this.descripcion = v.descripcion ?? '';
    this.precioVenta = v.precioVenta ?? 0;
    this.precioCompra = v.precioCompra ?? 0;
    this.stockActual = v.stockActual ?? 0;
    this.stockMinimo = v.stockMinimo ?? 0;
    this.descuentoEfectivo = v.descuentoEfectivo ?? 0;
    this.descuentoSocios = v.descuentoSocios ?? 0;
    this.descuentoNoSocios = v.descuentoNoSocios ?? 0;
    this.categoria = v.categoria ?? Categoria.CAMISETA;
    this.talles = v.talles ?? [Talle.XXL, Talle.XL, Talle.L, Talle.M, Talle.S, Talle.XS, Talle.XXS];
    this.caracteristicas = v.caracteristicas ?? [];
  }

  get hasLowStock(): boolean {
    return this.stockActual <= this.stockMinimo;
  }
}
