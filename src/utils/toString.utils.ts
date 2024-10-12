export const toArsString = (v: number | Big.Big) =>
  ((v as Big.Big)?.toNumber ? (v as Big.Big).toNumber() : v).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });

export const toPercentageString = (v: number, isMinusOne = true, prefix = '', suffix = '%') =>
  `${prefix}${isMinusOne ? v * 100 : v}${suffix}`;
